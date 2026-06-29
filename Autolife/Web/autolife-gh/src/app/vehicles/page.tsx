import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import VehicleGrid from '@/components/vehicles/VehicleGrid'

export const metadata = {
  title: 'Browse Vehicles - AutoLifeGh',
  description: 'Browse all available vehicles on AutoLifeGh marketplace',
}

export default function VehiclesPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          <h1 className="text-4xl font-bold mb-2">Browse Vehicles</h1>
          <p className="text-gray-600 mb-8">
            Find your perfect car from our comprehensive listing
          </p>

          {/* Vehicle Grid Component */}
          <VehicleGrid />
        </div>
      </main>
      <Footer />
    </>
  )
}
