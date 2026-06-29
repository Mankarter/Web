import { NextRequest, NextResponse } from 'next/server'
import { getVehicles, createVehicle, searchVehicles } from '@/lib/db'
import { SearchFilters } from '@/types'

/**
 * GET /api/vehicles
 * Fetch vehicles with optional filters and search
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Check if this is a search request
    const searchTerm = searchParams.get('q')
    if (searchTerm) {
      const results = await searchVehicles(searchTerm)
      return NextResponse.json(
        {
          success: true,
          data: results,
          count: results.length,
        },
        { status: 200 }
      )
    }

    // Parse filter parameters
    const filters: SearchFilters = {}
    if (searchParams.get('make')) filters.make = searchParams.get('make')!
    if (searchParams.get('model')) filters.model = searchParams.get('model')!
    if (searchParams.get('minYear')) filters.minYear = parseInt(searchParams.get('minYear')!)
    if (searchParams.get('maxYear')) filters.maxYear = parseInt(searchParams.get('maxYear')!)
    if (searchParams.get('minPrice'))
      filters.minPrice = parseFloat(searchParams.get('minPrice')!)
    if (searchParams.get('maxPrice'))
      filters.maxPrice = parseFloat(searchParams.get('maxPrice')!)
    if (searchParams.get('fuelType')) filters.fuelType = searchParams.get('fuelType')!
    if (searchParams.get('transmission')) filters.transmission = searchParams.get('transmission')!
    if (searchParams.get('bodyType')) filters.bodyType = searchParams.get('bodyType')!
    if (searchParams.get('mileage')) filters.mileage = parseInt(searchParams.get('mileage')!)

    // Pagination
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')

    const { data, count } = await getVehicles(filters, limit, offset)

    return NextResponse.json(
      {
        success: true,
        data,
        count,
        limit,
        offset,
        hasMore: offset + limit < count,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in GET /api/vehicles:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch vehicles',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/vehicles
 * Create a new vehicle listing
 */
export async function POST(request: NextRequest) {
  try {
    // In production, verify seller authentication here
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['make', 'model', 'year', 'price', 'seller_id']
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      )
    }

    // Create vehicle
    const vehicle = await createVehicle(body)

    return NextResponse.json(
      {
        success: true,
        data: vehicle,
        message: 'Vehicle listing created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/vehicles:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create vehicle listing',
      },
      { status: 500 }
    )
  }
}
