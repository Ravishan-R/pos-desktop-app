import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [edited, setEdited] = useState({});

  const load = () => window.api.getProducts().then(setProducts);

  useEffect(() => {
    load();
  }, []);

  const startEditing = (product) => {
    setEditingId(product.id);
    setEdited({ name: product.name, price: product.price, stock: product.stock });
  };

  const save = async (product) => {
    const updated = { id: product.id, ...edited };
    await window.api.updateProduct(updated);
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
          {products.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.id}</td>
              <td className="p-2 border">
                {editingId === p.id ? (
                  <input
                    className="border p-1 w-full"
                    value={edited.name}
                    onChange={(e) =>
                      setEdited((prev) => ({ ...prev, name: e.target.value }))
                    }
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
                    value={edited.price}
                    onChange={(e) =>
                      setEdited((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value),
                      }))
                    }
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
                    value={edited.stock}
                    onChange={(e) =>
                      setEdited((prev) => ({
                        ...prev,
                        stock: parseInt(e.target.value),
                      }))
                    }
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
                  <button
                    className="text-blue-600"
                    onClick={() => startEditing(p)}
                  >
                    Edit
                  </button>
                )}
                <button className="text-red-600" onClick={() => del(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
