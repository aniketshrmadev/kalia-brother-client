import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiPlus, HiCube, HiClock } from 'react-icons/hi';
import { HiExclamationTriangle } from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats } from '../api/products';

export default function AdminDashboard() {
  const { admin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (admin) {
      getDashboardStats()
        .then(res => setStats(res.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [admin]);

  if (authLoading) return null;
  if (!admin) return <Navigate to="/admin/login" />;

  const cards = [
    { icon: HiCube, label: 'Total Products', value: stats?.totalProducts || 0, gradient: 'from-kalia-gold to-yellow-600' },
    { icon: HiExclamationTriangle, label: 'Low Stock Alerts', value: stats?.lowStock?.length || 0, gradient: 'from-kalia-pink to-red-600' },
  ];

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
              Dashboard <span className="gradient-text italic">Overview</span>
            </h1>
          </div>
          <Link
            to="/admin/products"
            className="flex items-center gap-2 bg-kalia-gold text-kalia-bg px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all duration-500"
          >
            <HiPlus size={18} /> Products
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-5">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="skeleton h-32 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-500"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} mb-4`}>
                  <card.icon size={24} className="text-kalia-bg" />
                </div>
                <p className="text-kalia-muted text-sm">{card.label}</p>
                <p className="text-3xl font-bold text-kalia-offwhite mt-1">{card.value}</p>
              </motion.div>
            ))}
          </div>
        )}

        {stats?.lowStock?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h2 className="font-display text-xl text-kalia-offwhite mb-4 flex items-center gap-2">
              <HiExclamationTriangle className="text-kalia-pink" /> Low Stock Alerts
            </h2>
            <div className="space-y-2">
              {stats.lowStock.map(item => (
                <div key={item._id} className="glass-card border-kalia-pink/20 rounded-xl px-5 py-3.5 flex items-center justify-between hover:scale-[1.01] transition-all">
                  <span className="text-kalia-offwhite text-sm">{item.name}</span>
                  <span className="text-kalia-pink text-xs font-semibold uppercase tracking-wider">Low Stock</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {stats?.recentProducts?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display text-xl text-kalia-offwhite mb-4 flex items-center gap-2">
              <HiClock className="text-kalia-gold" /> Recently Added
            </h2>
            <div className="space-y-2">
              {stats.recentProducts.map(p => (
                <div key={p._id} className="glass-card rounded-xl px-5 py-3.5 flex items-center justify-between hover:scale-[1.01] transition-all">
                  <div>
                    <span className="text-kalia-offwhite text-sm">{p.name}</span>
                    <span className="text-kalia-muted text-xs ml-2">({p.category})</span>
                  </div>
                  <span className="text-kalia-gold text-sm font-bold">₹{p.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
