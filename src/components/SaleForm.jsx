import { useEffect, useState } from 'react';

export default function SaleForm({ cartItems, setCartItems }) {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.api.getProducts().then(setProducts);
  }, []);

  const addToCart = () => {
    const product = products.find(p => p.id === parseInt(selectedId));
    if (!product || quantity <= 0) return;

    const existing = cartItems.find(item => item.product_id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.product_id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([
        ...cartItems,
        {
          product_id: product.id,
          name: product.name,
          quantity,
          price: product.price
        }
      ]);
    }

    setQuantity(1);
    setSelectedId('');
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.product_id !== id));
  };

  const saveSale = async () => {
    if (cartItems.length === 0) return alert('Cart is empty');
    await window.api.createSale(cartItems);
    setCartItems([]);
    alert('Sale saved!');
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">New Sale</h2>
      <div className="flex items-center gap-2 mb-4">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} (${p.price}) - Stock: {p.stock}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border p-2 w-20"
        />
        <button onClick={addToCart} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <table className="w-full border text-sm mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.product_id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">${item.price.toFixed(2)}</td>
              <td className="border p-2">${(item.price * item.quantity).toFixed(2)}</td>
              <td className="border p-2">
                <button onClick={() => removeFromCart(item.product_id)} className="text-red-600">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cartItems.length > 0 && (
        <button onClick={saveSale} className="bg-green-600 text-white px-4 py-2 rounded">
          Complete Sale
        </button>
      )}
    </div>
  );
}
