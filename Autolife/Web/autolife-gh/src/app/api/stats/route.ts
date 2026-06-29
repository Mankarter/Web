import { NextRequest, NextResponse } from 'next/server'
import { getTotalVehiclesCount, getVehicleStatistics } from '@/lib/db'

/**
 * GET /api/stats
 * Get platform statistics
 */
export async function GET(request: NextRequest) {
  try {
    const totalVehicles = await getTotalVehiclesCount()
    const statistics = await getVehicleStatistics()

    return NextResponse.json(
      {
        success: true,
        data: {
          totalVehicles,
          statistics,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in GET /api/stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch statistics',
      },
      { status: 500 }
    )
  }
}
