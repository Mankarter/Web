import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Vehicle {
  id: string
  name: string
  year: number
  price: number
  mileage: string
  engine: string
  transmission: string
}

// Sample featured vehicles - replace with real data from Supabase
const featuredVehicles: Vehicle[] = [
  {
    id: '1',
    name: '2024 Jetour T2 Hybrid',
    year: 2024,
    price: 89999,
    mileage: 'Low Mileage',
    engine: '1.5L Turbo Hybrid',
    transmission: 'Automatic',
  },
  {
    id: '2',
    name: '2023 Mercedes-Benz E300L',
    year: 2023,
    price: 125000,
    mileage: '15,000 km',
    engine: '2.0L Turbo',
    transmission: 'Automatic',
  },
  {
    id: '3',
    name: '2024 Toyota Highlander',
    year: 2024,
    price: 95000,
    mileage: '5,000 km',
    engine: '3.5L V6',
    transmission: 'Automatic',
  },
  {
    id: '4',
    name: '2023 Honda CR-V',
    year: 2023,
    price: 72000,
    mileage: '8,000 km',
    engine: '1.5L Turbo',
    transmission: 'Automatic',
  },
  {
    id: '5',
    name: '2024 BMW X5',
    year: 2024,
    price: 140000,
    mileage: 'Low Mileage',
    engine: '3.0L Twin-Turbo',
    transmission: 'Automatic',
  },
  {
    id: '6',
    name: '2023 Volkswagen Passat',
    year: 2023,
    price: 68000,
    mileage: '12,000 km',
    engine: '2.0L TSI',
    transmission: 'Automatic',
  },
]

export default function FeaturedVehicles() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Vehicles</h2>
            <p className="text-gray-600">Handpicked vehicles from our trusted sellers</p>
          </div>
          <Link href="/vehicles" className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              {/* Image Placeholder */}
              <div className="bg-gray-300 h-48 flex items-center justify-center">
                <p className="text-gray-500">Vehicle Photo</p>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{vehicle.name}</h3>

                {/* Specs */}
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>🔧 {vehicle.engine}</p>
                  <p>⚙️ {vehicle.transmission}</p>
                  <p>📍 {vehicle.mileage}</p>
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
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden mt-8">
          <Link href="/vehicles" className="block w-full btn-primary text-center">
            View All Vehicles
          </Link>
        </div>
      </div>
    </section>
  )
}
