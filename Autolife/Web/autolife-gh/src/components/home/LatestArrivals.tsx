import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function LatestArrivals() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Arrivals</h2>
            <p className="text-gray-600">Recently added vehicles to our platform</p>
          </div>
          <Link href="/vehicles?sort=latest" className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
            View All <ArrowRight size={18} />
          </Link>
        </div>

        {/* Carousel/Grid - Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <div className="bg-gray-300 h-40 flex items-center justify-center">
                <p className="text-gray-500">Vehicle Photo</p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Vehicle {i + 1}</h3>
                <p className="text-blue-600 font-bold mb-2">GH₵ XX,XXX</p>
                <button className="w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
