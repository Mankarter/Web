import { supabase } from './supabase'
import { Vehicle, Inquiry, Seller, SearchFilters } from '@/types'

/**
 * Vehicle Database Operations
 */

// Get all vehicles with optional filters
export async function getVehicles(
  filters?: SearchFilters,
  limit: number = 20,
  offset: number = 0
) {
  let query = supabase
    .from('vehicles')
    .select('*', { count: 'exact' })
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (filters?.make) {
    query = query.eq('make', filters.make)
  }
  if (filters?.model) {
    query = query.eq('model', filters.model)
  }
  if (filters?.minYear) {
    query = query.gte('year', filters.minYear)
  }
  if (filters?.maxYear) {
    query = query.lte('year', filters.maxYear)
  }
  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice)
  }
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice)
  }
  if (filters?.fuelType) {
    query = query.eq('fuel_type', filters.fuelType)
  }
  if (filters?.transmission) {
    query = query.eq('transmission', filters.transmission)
  }
  if (filters?.bodyType) {
    query = query.eq('body_type', filters.bodyType)
  }
  if (filters?.mileage) {
    query = query.lte('mileage', filters.mileage)
  }

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching vehicles:', error)
    throw new Error('Failed to fetch vehicles')
  }

  return { data: data as Vehicle[], count: count || 0 }
}

// Get single vehicle by ID
export async function getVehicleById(id: string) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*, sellers(name, phone, whatsapp, location, verification_status, rating)')
    .eq('id', id)
    .eq('status', 'active')
    .single()

  if (error) {
    console.error('Error fetching vehicle:', error)
    throw new Error('Vehicle not found')
  }

  // Increment view count
  await supabase
    .from('vehicles')
    .update({ views: (data.views || 0) + 1 })
    .eq('id', id)

  return data as Vehicle & { sellers: Seller }
}

// Create new vehicle listing
export async function createVehicle(vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('vehicles')
    .insert([vehicle])
    .select()
    .single()

  if (error) {
    console.error('Error creating vehicle:', error)
    throw new Error('Failed to create vehicle listing')
  }

  return data as Vehicle
}

// Update vehicle
export async function updateVehicle(id: string, updates: Partial<Vehicle>) {
  const { data, error } = await supabase
    .from('vehicles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating vehicle:', error)
    throw new Error('Failed to update vehicle')
  }

  return data as Vehicle
}

// Delete vehicle (soft delete - mark as archived)
export async function deleteVehicle(id: string) {
  const { error } = await supabase
    .from('vehicles')
    .update({ status: 'archived' })
    .eq('id', id)

  if (error) {
    console.error('Error deleting vehicle:', error)
    throw new Error('Failed to delete vehicle')
  }
}

// Get featured vehicles
export async function getFeaturedVehicles(limit: number = 6) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'active')
    .order('views', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured vehicles:', error)
    throw new Error('Failed to fetch featured vehicles')
  }

  return data as Vehicle[]
}

// Get latest vehicles
export async function getLatestVehicles(limit: number = 8) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching latest vehicles:', error)
    throw new Error('Failed to fetch latest vehicles')
  }

  return data as Vehicle[]
}

/**
 * Inquiry/Message Database Operations
 */

// Create new inquiry
export async function createInquiry(inquiry: {
  vehicle_id: string
  buyer_name: string
  buyer_email: string
  buyer_phone?: string
  seller_id: string
  message?: string
  status: 'new' | 'responded' | 'closed'
}) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiry])
    .select()
    .single()

  if (error) {
    console.error('Error creating inquiry:', error)
    throw new Error('Failed to send inquiry')
  }

  return data as Inquiry
}

// Get inquiries for a vehicle
export async function getVehicleInquiries(vehicleId: string) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('vehicle_id', vehicleId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching inquiries:', error)
    throw new Error('Failed to fetch inquiries')
  }

  return data as Inquiry[]
}

// Update inquiry status
export async function updateInquiryStatus(inquiryId: string, status: string) {
  const { data, error } = await supabase
    .from('inquiries')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', inquiryId)
    .select()
    .single()

  if (error) {
    console.error('Error updating inquiry:', error)
    throw new Error('Failed to update inquiry')
  }

  return data as Inquiry
}

/**
 * Seller Database Operations
 */

// Get seller by ID
export async function getSellerById(sellerId: string) {
  const { data, error } = await supabase
    .from('sellers')
    .select('*')
    .eq('id', sellerId)
    .single()

  if (error) {
    console.error('Error fetching seller:', error)
    throw new Error('Seller not found')
  }

  return data as Seller
}

// Get seller's vehicles
export async function getSellerVehicles(sellerId: string) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('seller_id', sellerId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching seller vehicles:', error)
    throw new Error('Failed to fetch seller vehicles')
  }

  return data as Vehicle[]
}

// Create or update seller
export async function upsertSeller(seller: Partial<Seller> & { id: string }) {
  const { data, error } = await supabase
    .from('sellers')
    .upsert([seller], { onConflict: 'id' })
    .select()
    .single()

  if (error) {
    console.error('Error upserting seller:', error)
    throw new Error('Failed to save seller')
  }

  return data as Seller
}

/**
 * Search Database Operations
 */

// Search vehicles by multiple criteria
export async function searchVehicles(searchTerm: string, limit: number = 20) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'active')
    .or(
      `make.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
    )
    .limit(limit)

  if (error) {
    console.error('Error searching vehicles:', error)
    throw new Error('Search failed')
  }

  return data as Vehicle[]
}

/**
 * Statistics & Analytics
 */

// Get total vehicles count
export async function getTotalVehiclesCount() {
  const { count, error } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  if (error) {
    console.error('Error counting vehicles:', error)
    return 0
  }

  return count || 0
}

// Get vehicle statistics
export async function getVehicleStatistics() {
  const { data: stats } = await supabase
    .from('vehicles')
    .select('fuel_type, body_type, transmission')
    .eq('status', 'active')

  if (!stats) return {}

  const statistics = {
    byFuelType: stats.reduce((acc: any, v: any) => {
      acc[v.fuel_type] = (acc[v.fuel_type] || 0) + 1
      return acc
    }, {}),
    byBodyType: stats.reduce((acc: any, v: any) => {
      acc[v.body_type] = (acc[v.body_type] || 0) + 1
      return acc
    }, {}),
    byTransmission: stats.reduce((acc: any, v: any) => {
      acc[v.transmission] = (acc[v.transmission] || 0) + 1
      return acc
    }, {}),
  }

  return statistics
}
