
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp, MapPin, Home, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PredictPrice = () => {
  const [formData, setFormData] = useState({
    location: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    yearBuilt: '',
    lotSize: '',
    amenities: []
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePredict = async () => {
    setIsLoading(true);
    
    // Simulate API call with mock prediction
    setTimeout(() => {
      const mockPrice = Math.floor(Math.random() * 2000000) + 500000;
      const mockAccuracy = (Math.random() * 10 + 85).toFixed(1);
      
      setPrediction({
        estimatedPrice: mockPrice,
        accuracy: mockAccuracy,
        priceRange: {
          min: mockPrice * 0.9,
          max: mockPrice * 1.1
        },
        marketTrend: Math.random() > 0.5 ? 'up' : 'down',
        trendPercentage: (Math.random() * 10 + 2).toFixed(1)
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              AI Price Prediction
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get Your Property
              <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Price Estimate
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our advanced AI model analyzes market data to provide accurate property valuations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Home className="w-6 h-6 mr-2 text-blue-600" />
                  Property Details
                </CardTitle>
                <CardDescription>
                  Provide accurate information for the best price estimate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter city, state, or ZIP code"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-family">Single Family Home</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms and Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bedrooms</Label>
                    <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}+ bed{num > 1 ? 's' : ''}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bathrooms</Label>
                    <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange('bathrooms', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Bathrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}+ bath{num > 1 ? 's' : ''}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Square Footage */}
                <div className="space-y-2">
                  <Label htmlFor="squareFootage">Square Footage</Label>
                  <Input
                    id="squareFootage"
                    type="number"
                    placeholder="e.g., 2500"
                    value={formData.squareFootage}
                    onChange={(e) => handleInputChange('squareFootage', e.target.value)}
                  />
                </div>

                {/* Year Built and Lot Size */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      placeholder="e.g., 2010"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lotSize">Lot Size (sq ft)</Label>
                    <Input
                      id="lotSize"
                      type="number"
                      placeholder="e.g., 8000"
                      value={formData.lotSize}
                      onChange={(e) => handleInputChange('lotSize', e.target.value)}
                    />
                  </div>
                </div>

                {/* Predict Button */}
                <Button
                  onClick={handlePredict}
                  disabled={isLoading || !formData.location || !formData.propertyType}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 h-12 text-lg font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </div>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5 mr-2" />
                      Get Price Estimate
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {prediction ? (
                <>
                  {/* Main Price Card */}
                  <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-teal-500 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <DollarSign className="w-6 h-6 mr-2" />
                        Estimated Value
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold mb-2">
                        {formatPrice(prediction.estimatedPrice)}
                      </div>
                      <div className="text-blue-100 mb-4">
                        Range: {formatPrice(prediction.priceRange.min)} - {formatPrice(prediction.priceRange.max)}
                      </div>
                      <div className="flex items-center justify-between bg-white/20 rounded-lg p-4">
                        <div>
                          <div className="text-sm text-blue-100">Model Accuracy</div>
                          <div className="text-2xl font-bold">{prediction.accuracy}%</div>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className={`w-6 h-6 mr-2 ${prediction.marketTrend === 'up' ? 'text-green-300' : 'text-red-300'}`} />
                          <div>
                            <div className="text-sm text-blue-100">Market Trend</div>
                            <div className="text-lg font-semibold">
                              {prediction.marketTrend === 'up' ? '+' : '-'}{prediction.trendPercentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="text-sm text-gray-600 mb-1">Market Position</div>
                          <div className="text-xl font-bold text-gray-900">Above Average</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Calculator className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="text-sm text-gray-600 mb-1">Price per Sq Ft</div>
                          <div className="text-xl font-bold text-gray-900">
                            {formData.squareFootage ? formatPrice(prediction.estimatedPrice / parseInt(formData.squareFootage)) : 'N/A'}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <Card className="shadow-xl border-0 border-dashed border-gray-300">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Predict</h3>
                    <p className="text-gray-600">
                      Fill in the property details to get your AI-powered price estimate
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PredictPrice;
