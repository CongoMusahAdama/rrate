
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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

interface PropertyCardProps {
  property: Property;
  index: number;
  onViewDetails: (property: Property) => void;
  onContact: (property: Property) => void;
}

const PropertyCard = ({ property, index, onViewDetails, onContact }: PropertyCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to book a property.",
        variant: "destructive",
      });
      return;
    }

    if (user.userType === 'customer') {
      toast({
        title: "Booking initiated",
        description: `Booking process started for ${property.name}`,
      });
      // Here you would implement actual booking logic
    } else {
      toast({
        title: "Access restricted",
        description: "Only customers can book properties.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Property Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4 wine-gradient text-white px-3 py-1 rounded-full text-sm font-medium">
          {property.status}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          {property.type}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {property.location}
        </div>
        
        <h3 className="text-xl font-bold text-black mb-4">{property.name}</h3>
        
        {/* Property Features */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
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
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-2xl font-bold text-black">{property.price}</div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#722f37] text-[#722f37] hover:bg-[#722f37] hover:text-white transition-all duration-300"
              onClick={() => onViewDetails(property)}
            >
              View Details
            </Button>
            {user?.userType === 'customer' ? (
              <Button
                size="sm"
                className="wine-gradient hover:wine-gradient-hover transition-all duration-300"
                onClick={handleBooking}
              >
                Book Now
              </Button>
            ) : (
              <Button
                size="sm"
                className="wine-gradient hover:wine-gradient-hover transition-all duration-300"
                onClick={() => onContact(property)}
              >
                Contact
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
