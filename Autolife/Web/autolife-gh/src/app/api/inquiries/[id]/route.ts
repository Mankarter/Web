import { NextRequest, NextResponse } from 'next/server'
import { updateInquiryStatus } from '@/lib/db'

/**
 * PUT /api/inquiries/:id
 * Update inquiry status
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()

    if (!id || !body.status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Inquiry ID and status are required',
        },
        { status: 400 }
      )
    }

    // Valid statuses
    const validStatuses = ['new', 'responded', 'closed']
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        },
        { status: 400 }
      )
    }

    const inquiry = await updateInquiryStatus(id, body.status)

    return NextResponse.json(
      {
        success: true,
        data: inquiry,
        message: 'Inquiry status updated',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in PUT /api/inquiries/:id:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update inquiry',
      },
      { status: 500 }
    )
  }
}
