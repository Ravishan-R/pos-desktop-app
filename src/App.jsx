import { useState } from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

function App() {
  const [reloadFlag, setReloadFlag] = useState(0);

  const refresh = () => setReloadFlag((r) => r + 1);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">POS System</h1>
      <AddProductForm onAdd={refresh} />
      <ProductList key={reloadFlag} />
    </div>
  );
}

export default App;
