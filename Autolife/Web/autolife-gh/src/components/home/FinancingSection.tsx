import Link from 'next/link'
import { CreditCard } from 'lucide-react'

export default function FinancingSection() {
  return (
    <section className="bg-blue-600 text-white py-16 md:py-24" id="financing">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CreditCard size={32} />
              <h2 className="text-3xl md:text-4xl font-bold">Need Financing?</h2>
            </div>
            <p className="text-blue-100 mb-8 text-lg">
              We can connect you with financing partners to make vehicle ownership more accessible. 
              Get flexible payment options tailored to your budget.
            </p>
            <Link href="/financing" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block">
              Apply for Financing
            </Link>
          </div>

          {/* Right - Info Box */}
          <div className="bg-blue-700 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Financing Benefits</h3>
            <ul className="space-y-3 text-blue-100">
              <li>✓ Fast approval process</li>
              <li>✓ Competitive interest rates</li>
              <li>✓ Flexible payment terms</li>
              <li>✓ Support for first-time buyers</li>
              <li>✓ Transparent terms & conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
