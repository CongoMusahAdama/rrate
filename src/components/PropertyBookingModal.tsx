
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Users, Bed, Bath, Square, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: number;
  name: string;
  priceGHS: number;
  priceUSD: number;
  image: string;
  beds: number;
  baths: number;
  sqft: string;
  location: string;
  capacity?: number;
  features?: string[];
}

interface PropertyBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  currency: string;
}

const PropertyBookingModal = ({ isOpen, onClose, property, currency }: PropertyBookingModalProps) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();

  if (!property) return null;

  const formatPrice = (property: Property) => {
    if (currency === 'GHS') {
      return `₵${property.priceGHS.toLocaleString()}`;
    }
    return `$${property.priceUSD.toLocaleString()}`;
  };

  const capacity = property.capacity || property.beds * 2;
  const features = property.features || [
    'Free Wi-Fi',
    'Air Conditioning',
    'Kitchen',
    'Parking',
    'Security',
    'Garden'
  ];

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate || !fullName || !email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (guests > capacity) {
      toast({
        title: "Capacity Exceeded",
        description: `This property can accommodate up to ${capacity} guests.`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${property.name} has been submitted. We'll contact you shortly.`,
    });

    onClose();
    // Reset form
    setCheckInDate('');
    setCheckOutDate('');
    setGuests(1);
    setFullName('');
    setEmail('');
    setPhone('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">Book {property.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Overview */}
          <div className="relative">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {formatPrice(property)}
            </div>
          </div>

          <div>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
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
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Up to {capacity}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-black mb-2">Property Features</h4>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkin">Check-in Date</Label>
              <Input
                id="checkin"
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="checkout">Check-out Date</Label>
              <Input
                id="checkout"
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="guests">Number of Guests (Max: {capacity})</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              max={capacity}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyBookingModal;
