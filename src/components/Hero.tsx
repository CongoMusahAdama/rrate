
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    '/lovable-uploads/d35db465-e25d-4f59-b6dc-8b643a842ce7.png',
    '/lovable-uploads/dbe9155c-45cc-425a-9f2a-6f9eddd106e2.png',
    '/lovable-uploads/66307f55-92a6-4a22-ae71-482fe91c8e43.png'
  ];

  useEffect(() => {
    setIsVisible(true);

    // Cycle through images every 3 seconds
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(imageInterval);
  }, []);

  const formatPrice = (price: number) => {
    return `₵${(price * 12).toLocaleString()}`;
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/7941fa07-0642-44d7-b3cb-62c5458e6b62.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#0ea5e9] opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`max-w-xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center bg-white/90 text-[#0ea5e9] text-sm font-medium px-4 py-2 rounded-full mb-6 animate-fade-in backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#0ea5e9] rounded-full mr-2 animate-pulse"></span>
              AI-Powered Property Valuation for Ghana
            </div>
            
            <h1 className={`text-5xl lg:text-6xl font-bold text-[#0ea5e9] leading-tight mb-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} drop-shadow-lg`}>
              Find A House
              <span className="block text-white drop-shadow-md">
                That Suits You
              </span>
            </h1>
            
            <p className={`text-xl text-[#0ea5e9] mb-2 leading-relaxed transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} drop-shadow-md font-bold`}>
              Real-time, Real Estate Rates.
            </p>
            
            <p className={`text-lg text-white mb-8 leading-relaxed transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} drop-shadow-md`}>
              Want to find a home in Ghana? We are ready to help you find one that suits your lifestyle and needs with AI-powered price predictions.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 mb-12 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                to="/login"
                className="inline-flex items-center justify-center brand-blue-gradient text-white px-8 py-4 rounded-xl text-lg font-semibold hover:brand-blue-gradient-hover transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                to="/properties"
                className="inline-flex items-center justify-center bg-white/90 text-[#0ea5e9] px-8 py-4 rounded-xl text-lg font-semibold border-2 border-white/20 hover:bg-white transition-all transform hover:scale-105 shadow-md hover:shadow-lg backdrop-blur-sm"
              >
                Explore More
              </Link>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-8 transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">2000+</div>
                <div className="text-sm text-gray-300">Listed Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">8500+</div>
                <div className="text-sm text-gray-300">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">150+</div>
                <div className="text-sm text-gray-300">Awards</div>
              </div>
            </div>
          </div>

          {/* Right Content - Cycling Property Images */}
          <div className={`relative transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 bg-white/10 backdrop-blur-sm">
              <div className="relative w-full h-96 lg:h-[500px]">
                {heroImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Modern Ghanaian House ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl animate-fade-in">
              <div className="text-sm text-gray-600 mb-1">Estimated Price</div>
              <div className="text-2xl font-bold text-black">{formatPrice(450000)}</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl animate-fade-in">
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
