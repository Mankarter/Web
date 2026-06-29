'use client'

import { useState, useCallback } from 'react'
import { createInquiry, handleAPIError } from '@/lib/api'
import type { CreateInquiryPayload } from '@/lib/api'

export function useInquiry() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const sendInquiry = useCallback(async (payload: CreateInquiryPayload) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await createInquiry(payload)
      setSuccess(true)
      return true
    } catch (err) {
      setError(handleAPIError(err))
      return false
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
    sendInquiry,
    resetStatus,
  }
}
