
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
  onPaymentSuccess: () => void;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PaymentModal = ({ isOpen, onClose, property, onPaymentSuccess }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const initializePayment = () => {
    setIsProcessing(true);
    
    const handler = window.PaystackPop.setup({
      key: 'pk_live_abd71123626a60688c205672d269418120e94789',
      email: 'customer@email.com', // This would typically come from auth context
      amount: parseFloat(property?.price?.replace(/(GHS|₵|,)/g, '').trim() || '0') * 100, // Convert to kobo
      currency: 'GHS',
      ref: `ref_${Date.now()}`,
      callback: function(response: any) {
        console.log('Payment successful:', response);
        setIsProcessing(false);
        onPaymentSuccess();
        onClose();
      },
      onClose: function() {
        console.log('Payment modal closed');
        setIsProcessing(false);
      }
    });
    
    handler.openIframe();
  };

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-black">Complete Payment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-black mb-2">{property.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{property.location}</p>
            <div className="text-2xl font-bold text-[#0ea5e9]">{property.price}</div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>You will be redirected to Paystack to complete your payment securely.</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={initializePayment}
              className="flex-1 brand-button"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
