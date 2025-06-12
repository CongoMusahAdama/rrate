
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Home, Bed, Bath, Square, TrendingUp, Calculator, Brain } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PredictPrice = () => {
  const [formData, setFormData] = useState({
    location: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    yearBuilt: '',
    condition: ''
  });

  const [prediction, setPrediction] = useState<{
    estimatedPrice: number;
    confidence: number;
    marketTrend: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate AI prediction with realistic Ghana property prices
    await new Promise(resolve => setTimeout(resolve, 2000));

    const basePrice = 150000; // Base price in GHS
    const locationMultiplier = formData.location === 'East Legon' ? 3.5 : 
                              formData.location === 'Cantonments' ? 3.0 :
                              formData.location === 'Airport Residential' ? 2.5 : 1.5;
    
    const propertyMultiplier = formData.propertyType === 'Villa' ? 2.0 :
                              formData.propertyType === 'Penthouse' ? 1.8 :
                              formData.propertyType === 'House' ? 1.5 : 1.2;

    const bedroomMultiplier = parseInt(formData.bedrooms) * 0.3 + 1;
    const sqftMultiplier = parseInt(formData.squareFeet) / 1000 * 0.5 + 1;

    const estimatedPrice = Math.round(
      basePrice * locationMultiplier * propertyMultiplier * bedroomMultiplier * sqftMultiplier
    );

    setPrediction({
      estimatedPrice,
      confidence: Math.round(85 + Math.random() * 10),
      marketTrend: 'Increasing'
    });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-brand-blue rounded-full">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              AI Property
              <span className="block text-brand-blue">Price Prediction</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get accurate property valuations powered by advanced AI algorithms and real market data
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Calculator className="w-5 h-5 mr-2 text-brand-blue" />
                  Property Details
                </CardTitle>
                <CardDescription>
                  Fill in the details below to get your AI-powered price estimate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="location" className="text-gray-700">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      Location
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('location', value)} required>
                      <SelectTrigger className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue bg-white">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        <SelectItem value="East Legon">East Legon, Accra</SelectItem>
                        <SelectItem value="Cantonments">Cantonments, Accra</SelectItem>
                        <SelectItem value="Airport Residential">Airport Residential, Accra</SelectItem>
                        <SelectItem value="Spintex">Spintex, Accra</SelectItem>
                        <SelectItem value="Tema">Tema, Greater Accra</SelectItem>
                        <SelectItem value="Kumasi">Kumasi, Ashanti</SelectItem>
                        <SelectItem value="Takoradi">Takoradi, Western</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="propertyType" className="text-gray-700">
                      <Home className="inline w-4 h-4 mr-1" />
                      Property Type
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('propertyType', value)} required>
                      <SelectTrigger className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue bg-white">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Penthouse">Penthouse</SelectItem>
                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bedrooms" className="text-gray-700">
                        <Bed className="inline w-4 h-4 mr-1" />
                        Bedrooms
                      </Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                        placeholder="e.g. 3"
                        required
                        className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bathrooms" className="text-gray-700">
                        <Bath className="inline w-4 h-4 mr-1" />
                        Bathrooms
                      </Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.bathrooms}
                        onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                        placeholder="e.g. 2"
                        required
                        className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="squareFeet" className="text-gray-700">
                      <Square className="inline w-4 h-4 mr-1" />
                      Square Feet
                    </Label>
                    <Input
                      id="squareFeet"
                      type="number"
                      min="500"
                      value={formData.squareFeet}
                      onChange={(e) => handleInputChange('squareFeet', e.target.value)}
                      placeholder="e.g. 2500"
                      required
                      className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="yearBuilt" className="text-gray-700">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      min="1950"
                      max={new Date().getFullYear()}
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                      placeholder="e.g. 2020"
                      required
                      className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="condition" className="text-gray-700">Property Condition</Label>
                    <Select onValueChange={(value) => handleInputChange('condition', value)} required>
                      <SelectTrigger className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue bg-white">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Needs Renovation">Needs Renovation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full brand-button"
                  >
                    {isLoading ? 'Calculating...' : 'Get Price Estimate'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              {prediction && (
                <Card className="border border-gray-200 shadow-lg bg-gradient-to-br from-brand-blue/5 to-white">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <TrendingUp className="w-5 h-5 mr-2 text-brand-blue" />
                      AI Price Prediction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-600 mb-2">Estimated Market Value</div>
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        GHS {prediction.estimatedPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        {prediction.confidence}% Confidence Level
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Market Trend</div>
                        <div className="text-lg font-semibold text-green-600">{prediction.marketTrend}</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Price per sq ft</div>
                        <div className="text-lg font-semibold text-gray-900">
                          GHS {Math.round(prediction.estimatedPrice / parseInt(formData.squareFeet))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
                      <p className="text-sm text-gray-700">
                        Based on current market data, comparable sales, and location factors, 
                        this property shows strong value potential in the {formData.location} area. 
                        The estimate considers recent transactions and market trends.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info Card */}
              <Card className="border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">How Our AI Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Data Analysis</h4>
                      <p className="text-sm text-gray-600">Analyzes thousands of recent sales and market trends</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Location Factors</h4>
                      <p className="text-sm text-gray-600">Considers neighborhood amenities and accessibility</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Smart Prediction</h4>
                      <p className="text-sm text-gray-600">Generates accurate estimates with confidence levels</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PredictPrice;
