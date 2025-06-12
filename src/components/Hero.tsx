
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#0ea5e9] mb-6">
            Find A House
          </h1>
          <p className="text-xl md:text-2xl text-[#0ea5e9] mb-8 max-w-3xl mx-auto">
            Real-time, Real Estate Rates
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover your dream property with our AI-powered real estate platform. 
            Get accurate price predictions and find the perfect home in Ghana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/predict"
              className="border-2 border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all"
            >
              Predict Price
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
