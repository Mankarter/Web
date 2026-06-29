'use client'

import { useState, useCallback } from 'react'
import { createSeller, handleAPIError } from '@/lib/api'
import type { CreateSellerPayload } from '@/lib/api'

export function useSeller() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [sellerId, setSellerId] = useState<string | null>(null)

  const registerSeller = useCallback(async (payload: CreateSellerPayload) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await createSeller(payload)
      setSellerId(result.data.id)
      setSuccess(true)
      return result.data
    } catch (err) {
      setError(handleAPIError(err))
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const resetStatus = useCallback(() => {
    setError(null)
    setSuccess(false)
  }, [])

  return {
    loading,
    error,
    success,
    sellerId,
    registerSeller,
    resetStatus,
  }
}
