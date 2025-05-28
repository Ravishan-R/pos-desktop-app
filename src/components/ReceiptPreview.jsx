export default function ReceiptPreview({ cartItems }) {
    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  
    return (
      <div>
        <h2 className="text-lg font-bold mb-2">Receipt</h2>
        <ul className="text-sm divide-y">
          {cartItems.map((item, index) => (
            <li key={index} className="py-1 flex justify-between">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 font-bold text-right">
          Total: ${total.toFixed(2)}
        </div>
      </div>
    );
  }
  