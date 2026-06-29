import { Vehicle, Inquiry, Seller, SearchFilters } from '@/types'

const API_BASE = '/api'

/**
 * API Error Handler
 */
class APIError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

/**
 * Generic fetch helper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new APIError(
      response.status,
      data.error || 'An error occurred'
    )
  }

  return data
}

/**
 * Vehicle API Calls
 */

export async function fetchVehicles(
  filters?: SearchFilters,
  limit: number = 20,
  offset: number = 0
) {
  const params = new URLSearchParams()

  if (filters?.make) params.append('make', filters.make)
  if (filters?.model) params.append('model', filters.model)
  if (filters?.minYear) params.append('minYear', filters.minYear.toString())
  if (filters?.maxYear) params.append('maxYear', filters.maxYear.toString())
  if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
  if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
  if (filters?.fuelType) params.append('fuelType', filters.fuelType)
  if (filters?.transmission) params.append('transmission', filters.transmission)
  if (filters?.bodyType) params.append('bodyType', filters.bodyType)
  if (filters?.mileage) params.append('mileage', filters.mileage.toString())

  params.append('limit', limit.toString())
  params.append('offset', offset.toString())

  return fetchAPI(`/vehicles?${params.toString()}`)
}

export async function fetchVehicleById(id: string) {
  return fetchAPI(`/vehicles/${id}`)
}

export async function searchVehicles(searchTerm: string) {
  return fetchAPI(`/vehicles?q=${encodeURIComponent(searchTerm)}`)
}

export async function createVehicle(vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) {
  return fetchAPI('/vehicles', {
    method: 'POST',
    body: JSON.stringify(vehicle),
  })
}

export async function updateVehicle(id: string, updates: Partial<Vehicle>) {
  return fetchAPI(`/vehicles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
}

export async function deleteVehicle(id: string) {
  return fetchAPI(`/vehicles/${id}`, {
    method: 'DELETE',
  })
}

/**
 * Inquiry API Calls
 */

export interface CreateInquiryPayload {
  vehicle_id: string
  seller_id: string
  buyer_name: string
  buyer_email: string
  buyer_phone?: string
  message?: string
}

export async function createInquiry(inquiry: CreateInquiryPayload) {
  return fetchAPI('/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiry),
  })
}

export async function fetchVehicleInquiries(vehicleId: string) {
  return fetchAPI(`/inquiries?vehicleId=${vehicleId}`)
}

export async function updateInquiryStatus(inquiryId: string, status: string) {
  return fetchAPI(`/inquiries/${inquiryId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  })
}

/**
 * Seller API Calls
 */

export interface CreateSellerPayload {
  name: string
  email: string
  phone: string
  whatsapp?: string
  location?: string
}

export async function createSeller(seller: CreateSellerPayload) {
  return fetchAPI('/sellers', {
    method: 'POST',
    body: JSON.stringify(seller),
  })
}

export async function fetchSellerById(id: string) {
  return fetchAPI(`/sellers/${id}`)
}

export async function updateSeller(id: string, updates: Partial<Seller>) {
  return fetchAPI(`/sellers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
}

export async function fetchSellerVehicles(sellerId: string) {
  return fetchAPI(`/sellers/${sellerId}/vehicles`)
}

/**
 * Statistics API Calls
 */

export async function fetchPlatformStats() {
  return fetchAPI('/stats')
}

/**
 * Error Handler for use in components
 */
export function handleAPIError(error: unknown): string {
  if (error instanceof APIError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
