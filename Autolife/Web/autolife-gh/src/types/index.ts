// Vehicle types
export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  engineSize: string
  transmission: 'Manual' | 'Automatic'
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'
  bodyType: string
  condition: 'New' | 'Used' | 'Refurbished'
  description: string
  photos: string[]
  sellerId: string
  status: 'active' | 'sold' | 'archived'
  createdAt: string
  updatedAt: string
}

// User/Seller types
export interface Seller {
  id: string
  name: string
  email: string
  phone: string
  whatsapp?: string
  location: string
  verificationStatus: 'verified' | 'pending' | 'unverified'
  rating: number
  createdAt: string
}

// Search filter types
export interface SearchFilters {
  make?: string
  model?: string
  minYear?: number
  maxYear?: number
  minPrice?: number
  maxPrice?: number
  fuelType?: string
  transmission?: string
  bodyType?: string
  mileage?: number
}

// Inquiry/Message types
export interface Inquiry {
  id: string
  vehicleId: string
  buyerId: string
  sellerId: string
  message: string
  status: 'new' | 'responded' | 'closed'
  createdAt: string
}

// Testimonial types
export interface Testimonial {
  id: string
  content: string
  author: string
  location: string
  rating: number
  createdAt: string
}
