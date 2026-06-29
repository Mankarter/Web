import { CheckCircle } from 'lucide-react'

const features = [
  {
    icon: '✅',
    title: 'Verified Vehicle Listings',
    description: 'All vehicles undergo thorough inspection and verification',
  },
  {
    icon: '📋',
    title: 'Transparent Vehicle Information',
    description: 'Complete history and specifications for every vehicle',
  },
  {
    icon: '🤝',
    title: 'Trusted Dealers',
    description: 'Verified sellers with proven track records',
  },
  {
    icon: '💳',
    title: 'Easy Financing Support',
    description: 'Connect with financing partners for flexible payment options',
  },
  {
    icon: '🗺️',
    title: 'Nationwide Reach',
    description: 'Access to vehicles across all regions of Ghana',
  },
  {
    icon: '💬',
    title: 'Fast Buyer-Seller Communication',
    description: 'Direct messaging and real-time notifications',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AutoLifeGh?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to making car buying and selling simple, secure, and transparent
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
