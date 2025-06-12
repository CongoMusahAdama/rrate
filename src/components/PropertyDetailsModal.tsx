import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Bed, Bath, Square, Users, Calendar, Wifi, Car, Shield, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Property {
  id: number;
  name: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  sqft: string;
  location: string;
  type: string;
  status: string;
}

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  onScheduleViewing?: () => void;
}

const PropertyDetailsModal = ({ isOpen, onClose, property }: PropertyDetailsModalProps) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: ''
  });

  if (!property) return null;

  const handleScheduleViewing = () => {
    setShowScheduleForm(true);
  };

  const handleSubmitSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!scheduleData.date || !scheduleData.time || !scheduleData.name || !scheduleData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    toast({
      title: "Viewing Scheduled!",
      description: `Your viewing for ${property.name} has been scheduled for ${scheduleData.date} at ${scheduleData.time}.`,
    });

    // Reset form and close
    setScheduleData({ date: '', time: '', name: '', phone: '', email: '' });
    setShowScheduleForm(false);
    onClose();
  };

  const features = [
    { icon: Wifi, name: 'High-Speed Wi-Fi' },
    { icon: Car, name: 'Parking Space' },
    { icon: Shield, name: '24/7 Security' },
    { icon: Users, name: 'Family Friendly' },
    { icon: Calendar, name: 'Flexible Terms' },
  ];

  const specifications = [
    { label: 'Property Type', value: property.type },
    { label: 'Status', value: property.status },
    { label: 'Year Built', value: '2020' },
    { label: 'Lot Size', value: '0.5 acres' },
    { label: 'Property ID', value: `GH${property.id.toString().padStart(4, '0')}` },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">{property.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Image */}
          <div className="relative">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.status}
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
              {property.type}
            </div>
          </div>

          {/* Location and Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>
            <div className="text-3xl font-bold text-gray-900">{property.price}</div>
          </div>

          {/* Property Stats */}
          <div className="grid grid-cols-4 gap-6 py-4 bg-gray-50 rounded-lg px-6">
            <div className="text-center">
              <Bed className="w-6 h-6 mx-auto text-brand-orange mb-2" />
              <div className="text-2xl font-bold text-gray-900">{property.beds}</div>
              <div className="text-sm text-gray-600">Bedrooms</div>
            </div>
            <div className="text-center">
              <Bath className="w-6 h-6 mx-auto text-brand-orange mb-2" />
              <div className="text-2xl font-bold text-gray-900">{property.baths}</div>
              <div className="text-sm text-gray-600">Bathrooms</div>
            </div>
            <div className="text-center">
              <Square className="w-6 h-6 mx-auto text-brand-orange mb-2" />
              <div className="text-2xl font-bold text-gray-900">{property.sqft.replace(' sq ft', '')}</div>
              <div className="text-sm text-gray-600">Square Feet</div>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto text-brand-orange mb-2" />
              <div className="text-2xl font-bold text-gray-900">{property.beds * 2}</div>
              <div className="text-sm text-gray-600">Capacity</div>
            </div>
          </div>

          {/* Schedule Viewing Form */}
          {showScheduleForm && (
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-brand-blue" />
                Schedule Property Viewing
              </h3>
              <form onSubmit={handleSubmitSchedule} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-gray-700">Preferred Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={scheduleData.date}
                      onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-gray-700">Preferred Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduleData.time}
                      onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                      required
                      className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">Full Name *</Label>
                    <Input
                      id="name"
                      value={scheduleData.name}
                      onChange={(e) => setScheduleData({...scheduleData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                      className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={scheduleData.phone}
                      onChange={(e) => setScheduleData({...scheduleData, phone: e.target.value})}
                      placeholder="+233 XX XXX XXXX"
                      required
                      className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={scheduleData.email}
                    onChange={(e) => setScheduleData({...scheduleData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setShowScheduleForm(false)}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 brand-button"
                  >
                    Schedule Viewing
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Property Description</h3>
            <p className="text-gray-600 leading-relaxed">
              This beautiful {property.type.toLowerCase()} in {property.location} offers modern living with excellent amenities. 
              Featuring {property.beds} spacious bedrooms and {property.baths} well-appointed bathrooms, this property is perfect 
              for families or professionals looking for comfort and convenience. The property boasts contemporary design elements 
              and is located in a prime area with easy access to local amenities and transportation.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Property Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                    <IconComponent className="w-5 h-5 text-brand-blue" />
                    <span className="text-sm text-gray-700">{feature.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Property Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">{spec.label}:</span>
                  <span className="font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Close
            </Button>
            <Button
              className="flex-1 brand-button"
              onClick={handleScheduleViewing}
            >
              Schedule Viewing
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailsModal;
