import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyDetailsModal from '@/components/PropertyDetailsModal';
import ContactModal from '@/components/ContactModal';
import PaymentModal from '@/components/PaymentModal';
import PropertySearch, { SearchFilters } from '@/components/PropertySearch';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

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
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);

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
    setCurrentPage(1); // Reset to first page after search
  };

  const handleViewDetails = (property: typeof allProperties[0]) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };

  const handleContact = (property: typeof allProperties[0]) => {
    setSelectedProperty(property);
    setIsContactModalOpen(true);
  };

  const handleBook = (property: typeof allProperties[0]) => {
    setSelectedProperty(property);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Your payment was successful and your booking has been confirmed.",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Add Paystack script */}
      <script src="https://js.paystack.co/v1/inline.js"></script>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                Find Your
                <span className="block text-[#0ea5e9]">
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
                <h2 className="text-2xl font-bold text-black">Properties for Sale</h2>
                <p className="text-gray-600">{filteredProperties.length} properties found</p>
              </div>
              <Select>
                <SelectTrigger className="w-48 border-gray-300 focus:border-[#0ea5e9] focus:ring-[#0ea5e9] bg-white">
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
              <div className="text-center py-12 animate-fade-in">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-black mb-2">No Properties Found</h3>
                  <p className="text-gray-600 mb-6">
                    Sorry, we couldn't meet your request at the moment. Please check back later or explore new options.
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
                    onBook={handleBook}
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
                  className="border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white"
                >
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className={currentPage === i + 1 ? "brand-button" : "border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white"}
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white"
                >
                  Next
                </Button>
              </div>
            )}
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

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        property={selectedProperty}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default Properties;
