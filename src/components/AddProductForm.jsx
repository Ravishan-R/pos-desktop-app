import { useState } from 'react';

export default function AddProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await window.api.addProduct({ name, price: parseFloat(price), stock: parseInt(stock) });
    setName('');
    setPrice('');
    setStock('');
    onAdd(); // Refresh list
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow mb-4 space-y-2">
      <h2 className="text-xl font-bold">Add New Product</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 w-full"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </div>
    </form>
  );
}
