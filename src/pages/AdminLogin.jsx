import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch {
      toast.error('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mesh-bg">
      <div className="floating-orb w-64 h-64 bg-kalia-gold/10 top-20 left-20" />
      <div className="floating-orb w-48 h-48 bg-kalia-purple/10 bottom-20 right-20" style={{ animationDelay: '-4s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Logo className="h-14 w-auto mx-auto mb-3" />
          <p className="text-kalia-muted text-sm uppercase tracking-widest">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
          <h2 className="font-display text-xl text-kalia-offwhite text-center">Sign In</h2>

          <div>
            <label className="text-xs uppercase tracking-wider text-kalia-muted mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-4 py-3 text-kalia-offwhite focus:outline-none focus:border-kalia-gold focus:shadow-[0_0_15px_rgba(201,168,76,0.1)] transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-kalia-muted mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-4 py-3 text-kalia-offwhite focus:outline-none focus:border-kalia-gold focus:shadow-[0_0_15px_rgba(201,168,76,0.1)] transition-all duration-300"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-kalia-gold text-kalia-bg py-3.5 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all duration-500 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
