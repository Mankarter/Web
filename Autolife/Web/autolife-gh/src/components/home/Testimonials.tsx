'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    content: 'AutoLifeGh helped me find my dream SUV within days. The process was seamless!',
    author: 'Kwame A.',
    location: 'Accra',
    rating: 5,
  },
  {
    id: 2,
    content: 'The buying process was smooth and professional. Highly recommended!',
    author: 'Nana B.',
    location: 'Kumasi',
    rating: 5,
  },
  {
    id: 3,
    content: 'Great selection of vehicles and excellent customer service.',
    author: 'Ama K.',
    location: 'Takoradi',
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-24">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Customer Testimonials</h2>

        <div className="max-w-2xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
              &quot;{current.content}&quot;
            </p>

            {/* Author */}
            <div className="mb-6">
              <p className="font-semibold text-gray-900">— {current.author}</p>
              <p className="text-gray-600">{current.location}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
