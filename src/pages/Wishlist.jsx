import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { HiHeart } from 'react-icons/hi';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen pt-24 md:pt-28 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8"
      >
        <p className="outline-label">Your Collection</p>
        <h1 className="font-display text-4xl md:text-5xl text-kalia-offwhite mt-2">
          Wishlist <span className="gradient-text italic">({wishlist.length})</span>
        </h1>
      </motion.div>

      {wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 glass-card rounded-3xl"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-kalia-pink/10 mb-6">
            <HiHeart size={32} className="text-kalia-pink" />
          </div>
          <p className="text-kalia-muted text-lg mb-2">Your wishlist is empty</p>
          <p className="text-kalia-muted/60 text-sm mb-8">Save items you love to revisit them later</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-kalia-gold text-kalia-bg px-8 py-3.5 rounded-full font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all duration-500"
          >
            Explore Collection
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pb-12">
          {wishlist.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
