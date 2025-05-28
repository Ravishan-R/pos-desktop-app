import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [edited, setEdited] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const load = () => window.api.getProducts().then(setProducts);

  useEffect(() => {
    load();
  }, []);

  // Filter products based on searchTerm (case-insensitive)
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const save = async (p) => {
    await window.api.updateProduct({ ...p, ...edited });
    setEditingId(null);
    setEdited({});
    load();
  };

  const del = async (id) => {
    if (confirm('Delete this product?')) {
      await window.api.deleteProduct(id);
      load();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Product List</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.id}</td>
              <td className="p-2 border">
                {editingId === p.id ? (
                  <input
                    className="border p-1 w-full"
                    defaultValue={p.name}
                    onChange={(e) => setEdited((prev) => ({ ...prev, name: e.target.value }))}
                  />
                ) : (
                  p.name
                )}
              </td>
              <td className="p-2 border">
                {editingId === p.id ? (
                  <input
                    type="number"
                    className="border p-1 w-full"
                    defaultValue={p.price}
                    onChange={(e) => setEdited((prev) => ({ ...prev, price: parseFloat(e.target.value) }))}
                  />
                ) : (
                  `$${p.price.toFixed(2)}`
                )}
              </td>
              <td className="p-2 border">
                {editingId === p.id ? (
                  <input
                    type="number"
                    className="border p-1 w-full"
                    defaultValue={p.stock}
                    onChange={(e) => setEdited((prev) => ({ ...prev, stock: parseInt(e.target.value) }))}
                  />
                ) : (
                  p.stock
                )}
              </td>
              <td className="p-2 border space-x-2">
                {editingId === p.id ? (
                  <button
                    className="text-green-600"
                    onClick={() => save(p)}
                  >
                    Save
                  </button>
                ) : (
                  <button className="text-blue-600" onClick={() => setEditingId(p.id)}>
                    Edit
                  </button>
                )}
                <button className="text-red-600" onClick={() => del(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
