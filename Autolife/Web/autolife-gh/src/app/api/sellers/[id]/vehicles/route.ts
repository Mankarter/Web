import { NextRequest, NextResponse } from 'next/server'
import { getSellerVehicles } from '@/lib/db'

/**
 * GET /api/sellers/:id/vehicles
 * Fetch all vehicles listed by a seller
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sellerId = params.id

    if (!sellerId) {
      return NextResponse.json(
        { success: false, error: 'Seller ID is required' },
        { status: 400 }
      )
    }

    const vehicles = await getSellerVehicles(sellerId)

    return NextResponse.json(
      {
        success: true,
        data: vehicles,
        count: vehicles.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in GET /api/sellers/:id/vehicles:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch seller vehicles',
      },
      { status: 500 }
    )
  }
}
