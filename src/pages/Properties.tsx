import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyDetailsModal from '@/components/PropertyDetailsModal';
import ContactModal from '@/components/ContactModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Bed, Bath, Square, Filter } from 'lucide-react';

const properties = [
  {
    id: 1,
    name: 'Modern Villa in Beverly Hills',
    price: '$2,500,000',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    beds: 5,
    baths: 4,
    sqft: '3200 sq ft',
    location: 'Beverly Hills, CA',
    type: 'Villa',
    status: 'For Sale'
  },
  {
    id: 2,
    name: 'Luxury Penthouse Downtown',
    price: '$1,800,000',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    beds: 3,
    baths: 3,
    sqft: '2400 sq ft',
    location: 'Downtown LA, CA',
    type: 'Penthouse',
    status: 'For Sale'
  },
  {
    id: 3,
    name: 'Contemporary Family Home',
    price: '$950,000',
    image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    beds: 4,
    baths: 3,
    sqft: '2800 sq ft',
    location: 'Santa Monica, CA',
    type: 'House',
    status: 'For Sale'
  },
  {
    id: 4,
    name: 'Waterfront Condo',
    price: '$1,200,000',
    image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    beds: 2,
    baths: 2,
    sqft: '1600 sq ft',
    location: 'Marina del Rey, CA',
    type: 'Condo',
    status: 'For Sale'
  },
  {
    id: 5,
    name: 'Mid-Century Modern',
    price: '$1,750,000',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    beds: 4,
    baths: 3,
    sqft: '2600 sq ft',
    location: 'West Hollywood, CA',
    type: 'House',
    status: 'For Sale'
  },
  {
    id: 6,
    name: 'Elegant Townhouse',
    price: '$850,000',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    beds: 3,
    baths: 2,
    sqft: '2000 sq ft',
    location: 'Pasadena, CA',
    type: 'Townhouse',
    status: 'For Sale'
  }
];

const Properties = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleViewDetails = (property: typeof properties[0]) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };

  const handleContact = (property: typeof properties[0]) => {
    setSelectedProperty(property);
    setIsContactModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
        <Header />
        
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                Find Your
                <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Dream Property
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover amazing properties with AI-powered price insights
              </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Search className="inline w-4 h-4 mr-1" />
                    Search Location
                  </label>
                  <Input placeholder="Enter city, neighborhood, or address" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Type</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Price</SelectItem>
                      <SelectItem value="0-500000">Under $500K</SelectItem>
                      <SelectItem value="500000-1000000">$500K - $1M</SelectItem>
                      <SelectItem value="1000000-2000000">$1M - $2M</SelectItem>
                      <SelectItem value="2000000+">$2M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 h-10">
                  <Filter className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-black">Properties for Sale</h2>
                <p className="text-gray-600">{properties.length} properties found</p>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="beds">Most Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Property Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.status}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {property.type}
                    </div>
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
                        {property.beds} Beds
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.baths} Baths
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        {property.sqft}
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <div className="text-2xl font-bold text-black">{property.price}</div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-600 text-orange-600 hover:bg-orange-50"
                          onClick={() => handleViewDetails(property)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                          onClick={() => handleContact(property)}
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3"
              >
                Load More Properties
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <PropertyDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        property={selectedProperty}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        property={selectedProperty}
      />
    </>
  );
};

export default Properties;
