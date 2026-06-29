'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useVehicles } from '@/hooks/useVehicles'
import { Vehicle, SearchFilters } from '@/types'
import { Loader, AlertCircle } from 'lucide-react'

export default function VehicleGrid() {
  const [filters, setFilters] = useState<SearchFilters>({})
  const { vehicles, count, loading, error, searchVehicles, resetFilters } = useVehicles()

  // Load initial vehicles
  useEffect(() => {
    searchVehicles(filters)
  }, []) // Load once on mount

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    resetFilters()
    searchVehicles(newFilters)
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
        <AlertCircle className="text-red-600" size={20} />
        <div>
          <p className="font-semibold text-red-900">Error loading vehicles</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Filters */}
      <aside className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow p-6 sticky top-24">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div className="space-y-4">
            {/* Make Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Make</label>
              <input
                type="text"
                placeholder="e.g., Toyota"
                onChange={(e) =>
                  handleFilterChange({ ...filters, make: e.target.value || undefined })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Min Price (GH₵)</label>
              <input
                type="number"
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    minPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Price (GH₵)</label>
              <input
                type="number"
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    maxPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Fuel Type</label>
              <select
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    fuelType: e.target.value || undefined,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium mb-2">Transmission</label>
              <select
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    transmission: e.target.value || undefined,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            <button
              onClick={() => {
                setFilters({})
                resetFilters()
                searchVehicles({})
              }}
              className="w-full btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </aside>

      {/* Vehicle Grid */}
      <div className="lg:col-span-3">
        {loading && vehicles.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <Loader className="animate-spin text-blue-600" size={40} />
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Showing {vehicles.length} of {count} vehicles
            </p>

            {vehicles.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">No vehicles found matching your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Vehicle Card Component
function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {/* Image */}
      <div className="bg-gray-300 h-48 flex items-center justify-center">
        <p className="text-gray-500">Vehicle Photo</p>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>

        {/* Specs */}
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p>🔧 {vehicle.engineSize}</p>
          <p>⚙️ {vehicle.transmission}</p>
          <p>📍 {vehicle.mileage?.toLocaleString()} km</p>
        </div>

        {/* Price */}
        <div className="mb-4 pb-4 border-b">
          <p className="text-2xl font-bold text-blue-600">
            GH₵ {vehicle.price.toLocaleString()}
          </p>
        </div>

        {/* Button */}
        <Link
          href={`/vehicles/${vehicle.id}`}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
