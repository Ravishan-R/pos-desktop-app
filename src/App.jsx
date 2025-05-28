import { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.api.getProducts().then((products) => {
      console.log('Products from DB:', products);
    });

    window.api.addProduct({
      name: 'React Product',
      price: 19.99,
      stock: 5,
    }).then(() => {
      console.log('Product added!');
    });
  }, []);

  return <h1 className="text-3xl font-bold p-4">POS System UI</h1>;
}

export default App;
