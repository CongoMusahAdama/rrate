
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import CartModal from './CartModal';

const CartButton = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <>
      <Button
        onClick={() => setIsCartModalOpen(true)}
        variant="outline"
        className="relative border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Cart
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {getTotalItems()}
          </span>
        )}
      </Button>

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
};

export default CartButton;
