import { Routes, Route, NavLink } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import SalesPage from './pages/SalesPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <div className="max-w-5xl mx-auto mt-8">
      <nav className="mb-6 flex space-x-4 border-b pb-2">
        <NavLink
          to="/products"
          className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-600'}
        >
          Products
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-600'}
        >
          Sales
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-600'}
        >
          Reports
        </NavLink>
      </nav>

      <Routes>
        <Route path="/products" element={<ProductPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="*" element={<ProductPage />} /> {/* Default route */}
      </Routes>
    </div>
  );
}
