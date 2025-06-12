
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    priceRange: ''
  });

  const handleSearch = () => {
    // Check if any search criteria is provided
    const hasSearchCriteria = searchData.location || searchData.propertyType || searchData.priceRange;
    
    if (!hasSearchCriteria) {
      // If no search criteria, just navigate to properties page
      navigate('/properties');
      return;
    }

    // Create URL with search parameters
    const searchParams = new URLSearchParams();
    if (searchData.location) searchParams.set('location', searchData.location);
    if (searchData.propertyType) searchParams.set('type', searchData.propertyType);
    if (searchData.priceRange) searchParams.set('price', searchData.priceRange);
    
    navigate(`/properties?${searchParams.toString()}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Home
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search through thousands of properties with our advanced search filters
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Location
              </label>
              <Input
                placeholder="Enter location"
                value={searchData.location}
                onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="inline w-4 h-4 mr-1" />
                Property Type
              </label>
              <Select onValueChange={(value) => setSearchData({...searchData, propertyType: value === 'any' ? '' : value})}>
                <SelectTrigger className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue bg-white">
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Price Range
              </label>
              <Select onValueChange={(value) => setSearchData({...searchData, priceRange: value === 'any' ? '' : value})}>
                <SelectTrigger className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue bg-white">
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="any">Any Price</SelectItem>
                  <SelectItem value="0-500000">Under ₵500K</SelectItem>
                  <SelectItem value="500000-1000000">₵500K - ₵1M</SelectItem>
                  <SelectItem value="1000000-2000000">₵1M - ₵2M</SelectItem>
                  <SelectItem value="2000000+">₵2M+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1 flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full brand-button h-10"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
