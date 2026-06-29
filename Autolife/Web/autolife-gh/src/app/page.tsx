import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/home/HeroSection'
import SearchBar from '@/components/home/SearchBar'
import FeaturedVehicles from '@/components/home/FeaturedVehicles'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import LatestArrivals from '@/components/home/LatestArrivals'
import Testimonials from '@/components/home/Testimonials'
import FinancingSection from '@/components/home/FinancingSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SearchBar />
        <FeaturedVehicles />
        <WhyChooseUs />
        <LatestArrivals />
        <Testimonials />
        <FinancingSection />
      </main>
      <Footer />
    </>
  )
}
