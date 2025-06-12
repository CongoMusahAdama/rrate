import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyDetailsModal from '@/components/PropertyDetailsModal';
import ContactModal from '@/components/ContactModal';
import PropertySearch, { SearchFilters } from '@/components/PropertySearch';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { Search } from 'lucide-react';

const allProperties = [
  {
    id: 1,
    name: 'Modern Villa in East Legon',
    price: '₵2,500,000',
    image: '/lovable-uploads/d35db465-e25d-4f59-b6dc-8b643a842ce7.png',
    beds: 5,
    baths: 4,
    sqft: '3200 sq ft',
    location: 'East Legon, Accra',
    type: 'Villa',
    status: 'For Sale'
  },
  {
    id: 2,
    name: 'Luxury Penthouse Cantonments',
    price: '₵1,800,000',
    image: '/lovable-uploads/dbe9155c-45cc-425a-9f2a-6f9eddd106e2.png',
    beds: 3,
    baths: 3,
    sqft: '2400 sq ft',
    location: 'Cantonments, Accra',
    type: 'Penthouse',
    status: 'For Sale'
  },
  {
    id: 3,
    name: 'Contemporary Family Home',
    price: '₵950,000',
    image: '/lovable-uploads/66307f55-92a6-4a22-ae71-482fe91c8e43.png',
    beds: 4,
    baths: 3,
    sqft: '2800 sq ft',
    location: 'Airport Residential, Accra',
    type: 'House',
    status: 'For Sale'
  },
  {
    id: 4,
    name: 'Waterfront Apartment',
    price: '₵1,200,000',
    image: '/lovable-uploads/d35db465-e25d-4f59-b6dc-8b643a842ce7.png',
    beds: 2,
    baths: 2,
    sqft: '1600 sq ft',
    location: 'Labadi, Accra',
    type: 'Apartment',
    status: 'For Sale'
  },
  {
    id: 5,
    name: 'Modern Executive Home',
    price: '₵1,750,000',
    image: '/lovable-uploads/dbe9155c-45cc-425a-9f2a-6f9eddd106e2.png',
    beds: 4,
    baths: 3,
    sqft: '2600 sq ft',
    location: 'Spintex, Accra',
    type: 'House',
    status: 'For Sale'
  },
  {
    id: 6,
    name: 'Elegant Townhouse',
    price: '₵850,000',
    image: '/lovable-uploads/66307f55-92a6-4a22-ae71-482fe91c8e43.png',
    beds: 3,
    baths: 2,
    sqft: '2000 sq ft',
    location: 'Tema, Greater Accra',
    type: 'Townhouse',
    status: 'For Sale'
  }
];

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);
  const { addToCart } = useCart();

  // Apply search filters from URL on component mount
  useEffect(() => {
    const location = searchParams.get('location') || '';
    const propertyType = searchParams.get('type') || '';
    const priceRange = searchParams.get('price') || '';

    if (location || propertyType || priceRange) {
      handleSearch({ location, propertyType, priceRange });
    }
  }, [searchParams]);

  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handleSearch = (filters: SearchFilters) => {
    let filtered = allProperties;

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.name.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by property type
    if (filters.propertyType) {
      filtered = filtered.filter(property =>
        property.type.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(property => {
        const price = parseInt(property.price.replace(/[₵,]/g, ''));
        const [min, max] = filters.priceRange.split('-').map(p => parseInt(p) || Infinity);
        
        if (filters.priceRange.includes('+')) {
          return price >= min;
        }
        return price >= min && price <= max;
      });
    }

    setFilteredProperties(filtered);
    setNoResults(filtered.length === 0);
    setCurrentPage(1);
  };

  const handleViewDetails = (property: typeof allProperties[0]) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };

  const handleContact = (property: typeof allProperties[0]) => {
    setSelectedProperty(property);
    setIsContactModalOpen(true);
  };

  const handleAddToCart = (property: typeof allProperties[0]) => {
    addToCart(property);
    toast({
      title: "Added to Cart!",
      description: `${property.name} has been added to your cart.`,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Find Your
              <span className="block text-brand-blue">
                Dream Property
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing properties with AI-powered price insights
            </p>
          </div>

          {/* Search Component */}
          <PropertySearch onSearch={handleSearch} />

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Properties for Sale</h2>
              <p className="text-gray-600">{filteredProperties.length} properties found</p>
            </div>
            <Select>
              <SelectTrigger className="w-48 border-gray-300 focus:border-brand-blue focus:ring-brand-blue bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200">
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="beds">Most Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* No Results Message */}
          {noResults && (
            <div className="text-center py-16 animate-fade-in">
              <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Properties Found</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  No properties matched your search. Please try different filters or criteria, or check back in a few days for new listings.
                </p>
                <Button
                  onClick={() => {
                    setFilteredProperties(allProperties);
                    setNoResults(false);
                  }}
                  className="brand-button"
                >
                  View All Properties
                </Button>
              </div>
            </div>
          )}

          {/* Properties Grid */}
          {!noResults && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                  onViewDetails={handleViewDetails}
                  onContact={handleContact}
                  onBook={handleAddToCart}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!noResults && totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
              >
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className={currentPage === i + 1 ? "brand-button" : "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"}
                >
                  {i + 1}
                </Button>
              ))}
              
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />

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
    </div>
  );
};

export default Properties;
