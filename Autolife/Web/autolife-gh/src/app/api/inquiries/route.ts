import { NextRequest, NextResponse } from 'next/server'
import { createInquiry, getVehicleInquiries, updateInquiryStatus } from '@/lib/db'

/**
 * GET /api/inquiries
 * Fetch inquiries (requires seller authentication)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const vehicleId = searchParams.get('vehicleId')

    if (!vehicleId) {
      return NextResponse.json(
        { success: false, error: 'vehicleId is required' },
        { status: 400 }
      )
    }

    // In production, verify seller owns this vehicle
    const inquiries = await getVehicleInquiries(vehicleId)

    return NextResponse.json(
      {
        success: true,
        data: inquiries,
        count: inquiries.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in GET /api/inquiries:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch inquiries',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/inquiries
 * Create a new inquiry/message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['vehicle_id', 'buyer_name', 'buyer_email', 'seller_id']
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

    // Create inquiry
    const inquiry = await createInquiry({
      vehicle_id: body.vehicle_id,
      buyer_name: body.buyer_name,
      buyer_email: body.buyer_email,
      buyer_phone: body.buyer_phone,
      seller_id: body.seller_id,
      message: body.message,
      status: 'new',
    })

    // TODO: Send notification email to seller

    return NextResponse.json(
      {
        success: true,
        data: inquiry,
        message: 'Inquiry sent successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/inquiries:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send inquiry',
      },
      { status: 500 }
    )
  }
}
