
import { useState, useEffect } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const SearchSection = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');
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

  const handleSearch = () => {
    console.log('Searching with:', { location, propertyType, budget, currency });
    // Here you would implement the actual search functionality
  };

  const budgetOptions = currency === 'GHS' ? [
    { value: '0-600000', label: 'Under ₵600K' },
    { value: '600000-1200000', label: '₵600K - ₵1.2M' },
    { value: '1200000-2400000', label: '₵1.2M - ₵2.4M' },
    { value: '2400000-6000000', label: '₵2.4M - ₵6M' },
    { value: '6000000+', label: '₵6M+' }
  ] : [
    { value: '0-50000', label: 'Under $50K' },
    { value: '50000-100000', label: '$50K - $100K' },
    { value: '100000-200000', label: '$100K - $200K' },
    { value: '200000-500000', label: '$200K - $500K' },
    { value: '500000+', label: '$500K+' }
  ];

  return (
    <section className="relative -mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-2">Search for available properties in Ghana</h2>
          <p className="text-gray-600">Find your dream home with our advanced AI-powered search</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <MapPin className="inline w-4 h-4 mr-1" />
              Location
            </label>
            <Input
              type="text"
              placeholder="Enter city or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Home className="inline w-4 h-4 mr-1" />
              Property Type
            </label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="compound">Compound House</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <DollarSign className="inline w-4 h-4 mr-1" />
              Budget ({currency})
            </label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-10 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
