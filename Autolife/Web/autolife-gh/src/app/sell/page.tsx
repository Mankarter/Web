import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export const metadata = {
  title: 'Sell Your Car - AutoLifeGh',
  description: 'List your vehicle on AutoLifeGh',
}

export default function SellPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="container-custom py-16">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-10">
            <h1 className="text-3xl font-bold mb-4">Sell Your Car</h1>
            <p className="text-gray-600 mb-8">
              This starter page is ready for your listing flow. Connect your form or seller onboarding flow here.
            </p>
            <Link href="/vehicles" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
              Browse vehicles →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
