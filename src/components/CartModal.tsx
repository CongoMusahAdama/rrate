
import { useState } from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import PaymentModal from './PaymentModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    clearCart();
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Property Cart ({cartItems.length})
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add some properties to get started!</p>
              </div>
            ) : (
              <>
                {cartItems.map((property) => (
                  <div key={property.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{property.name}</h3>
                      <p className="text-sm text-gray-600">{property.location}</p>
                      <p className="text-lg font-bold text-[#0ea5e9]">{property.price}</p>
                    </div>
                    <Button
                      onClick={() => removeFromCart(property.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-black">Total:</span>
                    <span className="text-2xl font-bold text-[#0ea5e9]">
                      GHS {getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      className="flex-1"
                    >
                      Clear Cart
                    </Button>
                    <Button
                      onClick={handleCheckout}
                      className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        property={cartItems.length > 0 ? {
          name: `${cartItems.length} Properties`,
          location: 'Multiple Locations',
          price: `GHS ${getTotalPrice().toLocaleString()}`
        } : null}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default CartModal;
