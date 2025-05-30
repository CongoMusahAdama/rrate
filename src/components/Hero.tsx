
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currency, setCurrency] = useState('GHS');

  useEffect(() => {
    setIsVisible(true);
    
    // Simple location-based currency detection
    // In a real app, you'd use a geolocation API or IP-based detection
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (userTimeZone.includes('Ghana') || userTimeZone.includes('Africa/Accra')) {
      setCurrency('GHS');
    } else {
      setCurrency('USD');
    }
  }, []);

  const formatPrice = (price: number) => {
    if (currency === 'GHS') {
      return `₵${(price * 12).toLocaleString()}`; // Approximate conversion
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-orange-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`max-w-xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Property Valuation for Ghana
            </div>
            
            <h1 className={`text-5xl lg:text-6xl font-bold text-black leading-tight mb-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Find A House
              <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                That Suits You
              </span>
            </h1>
            
            <p className={`text-xl text-gray-600 mb-2 leading-relaxed transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="font-bold text-orange-600">Real-time, Real Estate Rates.</span>
            </p>
            
            <p className={`text-lg text-gray-600 mb-8 leading-relaxed transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Want to find a home in Ghana? We are ready to help you find one that suits your lifestyle and needs with AI-powered price predictions.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 mb-12 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                to="/predict"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/properties"
                className="inline-flex items-center justify-center bg-white text-gray-800 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-orange-300 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                View Properties
              </Link>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-8 transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-1">2000+</div>
                <div className="text-sm text-gray-600">Listed Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-1">8500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-1">150+</div>
                <div className="text-sm text-gray-600">Awards</div>
              </div>
            </div>
          </div>

          {/* Right Content - Property Image */}
          <div className={`relative transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="/lovable-uploads/56ab0d76-187c-4e43-8987-72ec33523c4d.png"
                alt="Modern Ghanaian House"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl animate-fade-in">
              <div className="text-sm text-gray-600 mb-1">Estimated Price</div>
              <div className="text-2xl font-bold text-black">{formatPrice(450000)}</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl animate-fade-in">
              <div className="text-sm text-gray-600 mb-1">Accuracy</div>
              <div className="text-2xl font-bold text-green-600">96.8%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
