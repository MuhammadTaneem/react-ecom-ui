import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { default as CheckoutPage } from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/ProductsPage';
import AdminOrdersPage from './pages/admin/OrdersPage';
import AdminCustomersPage from './pages/admin/CustomersPage';
import CategoriesPage from './pages/admin/categories';
import VariantsPage from './pages/admin/variants';
import TagsPage from './pages/admin/tags';
import BrandsPage from './pages/admin/brands';
import VouchersPage from './pages/admin/vouchers';

import { setTheme } from './store/slices/themeSlice';
import { useTheme } from './hooks/useTheme';

function App() {
  const dispatch = useDispatch();
  const { isDark } = useTheme();

  // Initialize theme from system preference or saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      dispatch(setTheme(savedTheme === 'dark'));
    } else if (prefersDark) {
      dispatch(setTheme(true));
    }
  }, [dispatch]);

  // Apply theme class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Routes>
      {/* Customer Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:category" element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="variants" element={<VariantsPage />} />
        <Route path="tags" element={<TagsPage />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="vouchers" element={<VouchersPage />} />
        {/* Add more admin routes as needed */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;