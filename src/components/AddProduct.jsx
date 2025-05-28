import { useState } from 'react';

export default function AddProduct({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, price, stock } = form;
    if (!name || isNaN(price) || isNaN(stock)) {
      setError('Please fill all fields correctly.');
      return;
    }

    await window.api.addProduct({
      name,
      price: parseFloat(price),
      stock: parseInt(stock)
    });

    setForm({ name: '', price: '', stock: '' });
    setError('');
    onAdd(); // refresh product list
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Add Product</h2>
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block">Price</label>
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block">Stock</label>
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Product
      </button>
    </form>
  );
}
