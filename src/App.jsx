import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import { useState } from 'react';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <AddProduct onAdd={refresh} />
      <ProductList key={refreshKey} />
    </div>
  );
}

export default App;
