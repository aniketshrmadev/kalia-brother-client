import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Search from './pages/Search';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 2500,
              style: {
                background: '#141414',
                color: '#F5F0E8',
                border: '1px solid rgba(201, 168, 76, 0.2)',
                borderRadius: '16px',
                padding: '12px 20px',
                backdropFilter: 'blur(10px)',
              },
              success: {
                iconTheme: { primary: '#C9A84C', secondary: '#0A0A0A' },
              },
              error: {
                iconTheme: { primary: '#FF2D78', secondary: '#0A0A0A' },
              },
            }}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppFloat />
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
    </ErrorBoundary>
  );
}
