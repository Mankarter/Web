import { NextRequest, NextResponse } from 'next/server'
import { getSellerById, getSellerVehicles, upsertSeller } from '@/lib/db'

/**
 * GET /api/sellers/:id
 * Fetch seller information
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Seller ID is required' },
        { status: 400 }
      )
    }

    const seller = await getSellerById(id)

    return NextResponse.json(
      {
        success: true,
        data: seller,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in GET /api/sellers/:id:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch seller',
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/sellers/:id
 * Update seller information
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Seller ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()

    // In production, verify seller owns this account
    const seller = await upsertSeller({ id, ...body })

    return NextResponse.json(
      {
        success: true,
        data: seller,
        message: 'Seller profile updated',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in PUT /api/sellers/:id:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update seller',
      },
      { status: 500 }
    )
  }
}
