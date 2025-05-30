
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Bed, Bath, Square } from 'lucide-react';

const properties = [
  {
    id: 1,
    name: 'Banana Island, Lagos',
    price: '₦100,000,000',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    beds: 4,
    baths: 3,
    sqft: '1600 m²',
    location: 'Lagos, Nigeria'
  },
  {
    id: 2,
    name: 'Parkview Estate, Lagos',
    price: '₦200,000,000',
    image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    beds: 5,
    baths: 4,
    sqft: '1800 m²',
    location: 'Lagos, Nigeria'
  },
  {
    id: 3,
    name: 'Eko Atlantic, Lagos',
    price: '₦500,000,000',
    image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    beds: 3,
    baths: 2,
    sqft: '1600 m²',
    location: 'Lagos, Nigeria'
  }
];

const PopularProperties = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center text-sm font-medium text-gray-600 mb-2">
              <div className="w-12 h-px bg-gray-400 mr-4"></div>
              POPULAR
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Our Popular Homes</h2>
          </div>
          <Button
            variant="ghost"
            className="hidden md:flex items-center text-blue-600 hover:text-blue-700"
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
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{property.name}</h3>
                
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
                  <div className="text-2xl font-bold text-gray-900">{property.price}</div>
                  <Button
                    size="sm"
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6"
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
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
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
