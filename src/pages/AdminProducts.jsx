import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import AdminProductForm from '../components/AdminProductForm';
import { getAllProductsAdmin, createProduct, updateProduct, deleteProduct } from '../api/products';

export default function AdminProducts() {
  const { admin, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    getAllProductsAdmin()
      .then(res => setProducts(res.data))
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (admin) fetchProducts();
  }, [admin]);

  if (authLoading) return null;
  if (!admin) return <Navigate to="/admin/login" />;

  const handleSubmit = async (data) => {
    try {
      if (editing) {
        await updateProduct(editing._id, data);
        toast.success('Product updated');
      } else {
        await createProduct(data);
        toast.success('Product created');
      }
      setShowForm(false);
      setEditing(null);
      fetchProducts();
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      const msg = err.response?.data?.message || 'Delete failed';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-kalia-bg">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <p className="outline-label">Admin</p>
            <h1 className="font-display text-3xl md:text-4xl text-kalia-offwhite mt-1">
              Products <span className="gradient-text italic">Management</span>
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-kalia-gold text-kalia-bg px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all duration-500"
          >
            <HiPlus size={18} /> Add Product
          </motion.button>
        </motion.div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-kalia-border/50">
                  <th className="text-left text-xs uppercase tracking-wider text-kalia-muted px-5 py-4">Product</th>
                  <th className="text-left text-xs uppercase tracking-wider text-kalia-muted px-5 py-4">Category</th>
                  <th className="text-left text-xs uppercase tracking-wider text-kalia-muted px-5 py-4">Price</th>
                  <th className="text-left text-xs uppercase tracking-wider text-kalia-muted px-5 py-4">Status</th>
                  <th className="text-right text-xs uppercase tracking-wider text-kalia-muted px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={5} className="px-5 py-4">
                        <div className="skeleton h-8 rounded-xl" />
                      </td>
                    </tr>
                  ))
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-kalia-muted">No products yet</td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p._id} className="border-b border-kalia-border/30 hover:bg-kalia-card/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.variants?.[0]?.images?.[0] || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='48'%3E%3Crect fill='%23141414' width='40' height='48' rx='8'/%3E%3C/svg%3E"}
                            alt=""
                            className="w-10 h-12 rounded-xl object-cover"
                          />
                          <span className="text-kalia-offwhite text-sm">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-kalia-muted text-sm">{p.category}</td>
                      <td className="px-5 py-4 text-kalia-gold text-sm font-bold">₹{p.price.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${p.isActive ? 'bg-kalia-neon/20 text-kalia-neon' : 'bg-kalia-pink/20 text-kalia-pink'}`}>
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => { setEditing(p); setShowForm(true); }}
                            className="p-2 rounded-xl hover:bg-kalia-gold/10 text-kalia-muted hover:text-kalia-gold transition-all duration-300"
                          >
                            <HiPencil size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(p._id)}
                            className="p-2 rounded-xl hover:bg-kalia-pink/10 text-kalia-muted hover:text-kalia-pink transition-all duration-300"
                          >
                            <HiTrash size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0.2 }}
              className="w-full max-w-3xl bg-kalia-bg border border-kalia-border rounded-2xl max-h-[90vh] overflow-y-auto"
            >
              <AdminProductForm
                product={editing}
                onSubmit={handleSubmit}
                onClose={() => { setShowForm(false); setEditing(null); }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
