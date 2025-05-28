import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';
import { useState } from 'react';

export default function ProductPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div>
      <AddProduct onAdd={refresh} />
      <ProductList key={refreshKey} />
    </div>
  );
}
