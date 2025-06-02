
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Kwame Asante',
    location: 'East Legon, Accra',
    rating: 5,
    text: 'RealRate helped me find my dream home in East Legon. The AI-powered price prediction was incredibly accurate, and I saved thousands on my purchase. Highly recommended',
    avatar: '/lovable-uploads/6b288a42-15bd-4c5d-a7cf-238470f6e2c9.png'
  },
  {
    id: 2,
    name: 'Akosua Mensah',
    location: 'Tema, Greater Accra',
    rating: 5,
    text: 'The booking process was seamless, and the property matched exactly what was advertised. Congo and his team provided excellent service throughout. Five stars',
    avatar: '/lovable-uploads/7edcfe81-d0cd-47a3-bb86-04e08df130e4.png'
  }
];

const CustomerTestimonials = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full mb-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Quote className="w-4 h-4 mr-2" />
            TESTIMONIALS
          </div>
          
          <h2 className={`text-4xl lg:text-5xl font-bold text-black mb-4 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            What Our Customers
            <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Real stories from satisfied customers who found their perfect homes with RealRate
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${index === 1 ? 'md:translate-y-8' : ''}`}
              style={{ transitionDelay: `${600 + index * 200}ms` }}
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {testimonial.text}
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-black">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-12 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-gray-600 mb-4">Ready to find your dream home</p>
          <Link
            to="/login"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
