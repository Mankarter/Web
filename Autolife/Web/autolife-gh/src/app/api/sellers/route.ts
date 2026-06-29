import { NextRequest, NextResponse } from 'next/server'
import { upsertSeller } from '@/lib/db'

/**
 * POST /api/sellers
 * Create or register a new seller
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone']
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

    // Create seller (will generate UUID)
    const seller = await upsertSeller({
      id: body.id || crypto.randomUUID(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      whatsapp: body.whatsapp,
      location: body.location,
      verification_status: 'unverified',
      rating: 0,
    })

    return NextResponse.json(
      {
        success: true,
        data: seller,
        message: 'Seller account created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/sellers:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create seller account',
      },
      { status: 500 }
    )
  }
}
