import { NextRequest, NextResponse } from 'next/server'
import { getVehicleById, updateVehicle, deleteVehicle } from '@/lib/db'

/**
 * GET /api/vehicles/:id
 * Fetch a single vehicle by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Vehicle ID is required' },
        { status: 400 }
      )
    }

    const vehicle = await getVehicleById(id)

    return NextResponse.json(
      {
        success: true,
        data: vehicle,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in GET /api/vehicles/:id:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch vehicle',
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/vehicles/:id
 * Update a vehicle listing
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Vehicle ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()

    // In production, verify seller ownership here
    const vehicle = await updateVehicle(id, body)

    return NextResponse.json(
      {
        success: true,
        data: vehicle,
        message: 'Vehicle updated successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in PUT /api/vehicles/:id:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update vehicle',
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/vehicles/:id
 * Delete (archive) a vehicle listing
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Vehicle ID is required' },
        { status: 400 }
      )
    }

    // In production, verify seller ownership here
    await deleteVehicle(id)

    return NextResponse.json(
      {
        success: true,
        message: 'Vehicle listing archived successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in DELETE /api/vehicles/:id:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete vehicle',
      },
      { status: 500 }
    )
  }
}
