
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: number;
  name: string;
  location: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

const ContactModal = ({ isOpen, onClose, property }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  if (!property) return null;

  const handleContact = () => {
    if (!name || !email || !phone || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "The property owner will contact you soon.",
    });

    onClose();
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">Contact Property Owner</DialogTitle>
          <p className="text-gray-600">{property.name}</p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Property Owner Info */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-black mb-2">Property Owner</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +233 531 187 8243
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@realrateai.com
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {property.location}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact-name">Your Name *</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="contact-email">Email *</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="contact-phone">Phone Number *</Label>
              <Input
                id="contact-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <Label htmlFor="contact-message">Message *</Label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your interest in this property..."
                rows={4}
              />
            </div>
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
              onClick={handleContact}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
