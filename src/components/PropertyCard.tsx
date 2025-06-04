
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
}

const PropertyCard = ({ property, index, onViewDetails, onContact }: PropertyCardProps) => {
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
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
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
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-500">
            {property.price}
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Button
            onClick={() => onViewDetails(property)}
            variant="outline"
            className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button
            onClick={() => onContact(property)}
            className="flex-1 blue-gradient hover:blue-gradient-hover text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
