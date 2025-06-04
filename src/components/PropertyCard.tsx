
import { Bed, Bath, Square, MapPin, Eye, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
  property: {
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
  };
  index: number;
  onViewDetails: (property: any) => void;
  onContact: (property: any) => void;
  onBook?: (property: any) => void;
}

const PropertyCard = ({ property, index, onViewDetails, onContact, onBook }: PropertyCardProps) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#0ea5e9] text-white px-3 py-1 rounded-full text-sm font-medium">
            {property.status}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
            {property.type}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-2">{property.name}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4 text-gray-600">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.beds}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.baths}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.sqft}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-[#0ea5e9]">
            {property.price}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={() => onViewDetails(property)}
            variant="outline"
            className="flex-1 border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          {onBook ? (
            <Button
              onClick={() => onBook(property)}
              className="flex-1 brand-button"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          ) : (
            <Button
              onClick={() => onContact(property)}
              className="flex-1 brand-button"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
