
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Square, Users, Calendar, Wifi, Car, Shield } from 'lucide-react';

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
}

const PropertyDetailsModal = ({ isOpen, onClose, property }: PropertyDetailsModalProps) => {
  if (!property) return null;

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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">{property.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Image */}
          <div className="relative">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
            <div className="text-3xl font-bold text-black">{property.price}</div>
          </div>

          {/* Property Stats */}
          <div className="grid grid-cols-4 gap-6 py-4 bg-gray-50 rounded-lg px-6">
            <div className="text-center">
              <Bed className="w-6 h-6 mx-auto text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-black">{property.beds}</div>
              <div className="text-sm text-gray-600">Bedrooms</div>
            </div>
            <div className="text-center">
              <Bath className="w-6 h-6 mx-auto text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-black">{property.baths}</div>
              <div className="text-sm text-gray-600">Bathrooms</div>
            </div>
            <div className="text-center">
              <Square className="w-6 h-6 mx-auto text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-black">{property.sqft.replace(' sq ft', '')}</div>
              <div className="text-sm text-gray-600">Square Feet</div>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-black">{property.beds * 2}</div>
              <div className="text-sm text-gray-600">Capacity</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-black mb-3">Property Description</h3>
            <p className="text-gray-600 leading-relaxed">
              This beautiful {property.type.toLowerCase()} in {property.location} offers modern living with excellent amenities. 
              Featuring {property.beds} spacious bedrooms and {property.baths} well-appointed bathrooms, this property is perfect 
              for families or professionals looking for comfort and convenience. The property boasts contemporary design elements 
              and is located in a prime area with easy access to local amenities and transportation.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold text-black mb-3">Property Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                    <IconComponent className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-gray-700">{feature.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-bold text-black mb-3">Property Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">{spec.label}:</span>
                  <span className="font-medium text-black">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
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
