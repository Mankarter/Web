'use client'

import { useState, useCallback } from 'react'
import { Vehicle, SearchFilters } from '@/types'
import { fetchVehicles, handleAPIError } from '@/lib/api'

interface VehicleListResponse {
  data: Vehicle[]
  count: number
}

export function useVehicles(initialFilters?: SearchFilters) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [offset, setOffset] = useState(0)

  const searchVehicles = useCallback(
    async (filters?: SearchFilters, limit: number = 20) => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchVehicles(filters || initialFilters, limit, offset) as VehicleListResponse
        setVehicles(result.data)
        setCount(result.count)
      } catch (err) {
        setError(handleAPIError(err))
      } finally {
        setLoading(false)
      }
    },
    [offset, initialFilters]
  )

  const loadMore = useCallback(
    (filters?: SearchFilters, limit: number = 20) => {
      setOffset((prev) => prev + limit)
      searchVehicles(filters, limit)
    },
    [searchVehicles]
  )

  const resetFilters = useCallback(() => {
    setOffset(0)
    setVehicles([])
    setCount(0)
    setError(null)
  }, [])

  return {
    vehicles,
    count,
    loading,
    error,
    offset,
    searchVehicles,
    loadMore,
    resetFilters,
  }
}
