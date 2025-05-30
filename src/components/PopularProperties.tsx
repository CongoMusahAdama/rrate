
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Bed, Bath, Square } from 'lucide-react';

const properties = [
  {
    id: 1,
    name: 'East Legon Luxury Villa',
    priceGHS: 1200000,
    priceUSD: 100000,
    image: '/lovable-uploads/56ab0d76-187c-4e43-8987-72ec33523c4d.png',
    beds: 4,
    baths: 3,
    sqft: '300 m²',
    location: 'East Legon, Accra'
  },
  {
    id: 2,
    name: 'Airport Hills Estate',
    priceGHS: 1800000,
    priceUSD: 150000,
    image: '/lovable-uploads/c25a6ce0-4d21-4693-b1d6-c673df380c02.png',
    beds: 5,
    baths: 4,
    sqft: '450 m²',
    location: 'Airport Hills, Accra'
  },
  {
    id: 3,
    name: 'Tema Community 25',
    priceGHS: 960000,
    priceUSD: 80000,
    image: '/lovable-uploads/1961377a-f170-4b38-a356-d3ec9c96174c.png',
    beds: 3,
    baths: 2,
    sqft: '250 m²',
    location: 'Tema, Greater Accra'
  }
];

const PopularProperties = () => {
  const [currency, setCurrency] = useState('GHS');

  useEffect(() => {
    // Simple location-based currency detection
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (userTimeZone.includes('Ghana') || userTimeZone.includes('Africa/Accra')) {
      setCurrency('GHS');
    } else {
      setCurrency('USD');
    }
  }, []);

  const formatPrice = (property: typeof properties[0]) => {
    if (currency === 'GHS') {
      return `₵${property.priceGHS.toLocaleString()}`;
    }
    return `$${property.priceUSD.toLocaleString()}`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center text-sm font-medium text-gray-600 mb-2">
              <div className="w-12 h-px bg-orange-400 mr-4"></div>
              POPULAR
            </div>
            <h2 className="text-4xl font-bold text-black">Our Popular Homes in Ghana</h2>
          </div>
          <Button
            variant="ghost"
            className="hidden md:flex items-center text-orange-600 hover:text-orange-700"
          >
            Explore All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                
                <h3 className="text-xl font-bold text-black mb-4">{property.name}</h3>
                
                {/* Property Features */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {property.beds} Bed
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {property.baths} Bath
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.sqft}
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-black">{formatPrice(property)}</div>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Explore All Button */}
        <div className="md:hidden text-center mt-8">
          <Button
            variant="outline"
            className="border-orange-600 text-orange-600 hover:bg-orange-50"
          >
            Explore All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularProperties;
