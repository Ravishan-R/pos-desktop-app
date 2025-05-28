import { useEffect, useState } from 'react';

export default function SaleForm() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    window.api.getProducts().then(setProducts);
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.product_id === product.id);
    if (existing) {
      setCart((cart) =>
        cart.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((cart) => [...cart, { product_id: product.id, name: product.name, price: product.price, quantity: 1 }]);
    }
  };

  const removeFromCart = (product_id) => {
    setCart((cart) => cart.filter((item) => item.product_id !== product_id));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Cart is empty.");
    await window.api.createSale(cart);
    alert('Sale completed!');
    setCart([]);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Sales</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Products</h3>
          <ul>
            {products.map((p) => (
              <li key={p.id} className="flex justify-between border-b py-1">
                <span>{p.name}</span>
                <button className="text-blue-600" onClick={() => addToCart(p)}>Add</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Cart</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.product_id} className="flex justify-between border-b py-1">
                <span>{item.name} × {item.quantity}</span>
                <button className="text-red-600" onClick={() => removeFromCart(item.product_id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="mt-2 font-bold">
            Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </div>
          <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
