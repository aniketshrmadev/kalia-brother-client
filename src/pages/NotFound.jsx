import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-display text-8xl text-kalia-gold mb-4">404</h1>
        <p className="text-kalia-muted text-lg mb-8">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-kalia-gold text-kalia-bg px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all duration-500"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
