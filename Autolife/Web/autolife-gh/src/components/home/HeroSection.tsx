import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Find Your Next Car at AutoLifeGh
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Browse quality vehicles from trusted sellers across Ghana. Whether you're looking for a luxury SUV, family car, pickup, or hybrid, AutoLifeGh makes car buying simple and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/vehicles" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2">
                View Cars
                <ArrowRight size={18} />
              </Link>
              <Link href="/sell" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center gap-2">
                Sell Your Car
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Right - Placeholder for image */}
          <div className="hidden md:block">
            <div className="bg-blue-500 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-blue-100 text-lg">Premium Vehicle Image</p>
                <p className="text-blue-200 text-sm mt-2">Add your hero image here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
