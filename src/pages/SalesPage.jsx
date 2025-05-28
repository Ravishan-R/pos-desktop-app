import { useState } from 'react';
import SaleForm from '../components/SaleForm';
import ReceiptPreview from '../components/ReceiptPreview';

export default function SalesPage() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="p-4 space-y-6">
      {/* Sales Form on top */}
      <div>
        <SaleForm cartItems={cartItems} setCartItems={setCartItems} />
      </div>

      {/* Receipt Preview below */}
      <div className="border-t pt-4">
        <ReceiptPreview cartItems={cartItems} />
      </div>
    </div>
  );
}
