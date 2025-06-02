
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Filter } from 'lucide-react';

interface PropertySearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  location: string;
  propertyType: string;
  priceRange: string;
}

const PropertySearch = ({ onSearch }: PropertySearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    propertyType: '',
    priceRange: ''
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handlePropertyTypeChange = (value: string) => {
    setFilters({ ...filters, propertyType: value });
  };

  const handlePriceRangeChange = (value: string) => {
    setFilters({ ...filters, priceRange: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search className="inline w-4 h-4 mr-1" />
            Search Location
          </label>
          <Input 
            placeholder="Enter city, neighborhood, or address" 
            value={filters.location}
            onChange={handleLocationChange}
            className="border-gray-300 focus:border-[#722f37] focus:ring-[#722f37]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <Select onValueChange={handlePropertyTypeChange} value={filters.propertyType}>
            <SelectTrigger className="border-gray-300 focus:border-[#722f37] focus:ring-[#722f37]">
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Type</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <Select onValueChange={handlePriceRangeChange} value={filters.priceRange}>
            <SelectTrigger className="border-gray-300 focus:border-[#722f37] focus:ring-[#722f37]">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Price</SelectItem>
              <SelectItem value="0-500000">Under ₵500K</SelectItem>
              <SelectItem value="500000-1000000">₵500K - ₵1M</SelectItem>
              <SelectItem value="1000000-2000000">₵1M - ₵2M</SelectItem>
              <SelectItem value="2000000+">₵2M+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={handleSearch}
          className="wine-gradient hover:wine-gradient-hover h-10"
        >
          <Filter className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default PropertySearch;
