import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { getVehicleById } from '@/lib/db'

interface VehicleDetailPageProps {
  params: {
    id: string
  }
}

export const metadata = {
  title: 'Vehicle Details - AutoLifeGh',
  description: 'View detailed information about a vehicle listing',
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  try {
    const vehicle = await getVehicleById(params.id)

    return (
      <>
        <Header />
        <main className="bg-gray-50 min-h-screen">
          <div className="container-custom py-8">
            <Link href="/vehicles" className="text-blue-600 hover:text-blue-700 font-medium mb-6 inline-flex">
              ← Back to vehicles
            </Link>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gray-200 h-80 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Vehicle photo gallery coming soon</p>
              </div>

              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">
                      {vehicle.make}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h1>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    GH₵ {vehicle.price?.toLocaleString()}
                  </div>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Vehicle Overview</h2>
                      <p className="text-gray-600">{vehicle.description || 'Detailed information will be added soon.'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500">Mileage</p>
                        <p className="font-semibold">{vehicle.mileage?.toLocaleString()} km</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500">Engine</p>
                        <p className="font-semibold">{vehicle.engineSize}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500">Transmission</p>
                        <p className="font-semibold">{vehicle.transmission}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500">Fuel Type</p>
                        <p className="font-semibold">{vehicle.fuelType}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">Contact Seller</h2>
                    <p className="text-gray-700 mb-4">
                      Interested in this vehicle? Reach out to the seller directly through the marketplace.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-500">Seller</p>
                        <p className="font-semibold">{vehicle.sellerId}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-500">Condition</p>
                        <p className="font-semibold">{vehicle.condition}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  } catch {
    notFound()
  }
}
