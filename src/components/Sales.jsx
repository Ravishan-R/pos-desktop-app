import { useEffect, useState } from 'react';

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.api.getProducts().then(setProducts);
  }, []);

  const addToCart = () => {
    if (!selectedProductId) return;
    const product = products.find(p => p.id === parseInt(selectedProductId));
    if (!product || quantity < 1) return;

    setCart((prev) => {
      const exists = prev.find(item => item.product_id === product.id);
      if (exists) {
        return prev.map(item =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product_id: product.id, name: product.name, price: product.price, quantity }];
    });
  };

  const removeFromCart = (product_id) => {
    setCart(cart.filter(item => item.product_id !== product_id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const completeSale = async () => {
    if (cart.length === 0) return alert('Cart is empty');
    await window.api.createSale(cart);
    alert('Sale completed!');
    setCart([]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">New Sale</h2>
      <div className="mb-4 flex gap-2">
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="border p-2 flex-grow"
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border p-2 w-20"
        />
        <button
          onClick={addToCart}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      <table className="w-full border mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Subtotal</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.product_id}>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">${item.price.toFixed(2)}</td>
              <td className="p-2 border">{item.quantity}</td>
              <td className="p-2 border">${(item.price * item.quantity).toFixed(2)}</td>
              <td className="p-2 border">
                <button
                  className="text-red-600"
                  onClick={() => removeFromCart(item.product_id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {cart.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">Cart is empty.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="text-right font-bold mb-4">Total: ${total.toFixed(2)}</div>

      <button
        onClick={completeSale}
        className="bg-green-600 text-white px-6 py-2 disabled:opacity-50"
        disabled={cart.length === 0}
      >
        Complete Sale
      </button>
    </div>
  );
}
