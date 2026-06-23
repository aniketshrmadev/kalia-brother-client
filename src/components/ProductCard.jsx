import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHeart } from 'react-icons/hi';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product._id);

  const firstVariant = product.variants?.[0];
  const NO_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23141414' width='400' height='500'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%23C9A84C' font-family='sans-serif' font-size='18'%3ENo Image%3C/text%3E%3Ctext x='50%25' y='58%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='sans-serif' font-size='12'%3EUpload a photo%3C/text%3E%3C/svg%3E";
  const mainImage = firstVariant?.images?.[0] || NO_IMAGE;
  const hoverImage = firstVariant?.images?.[1] || mainImage;

  const allSizes = firstVariant?.sizes?.map(s => s.size) || [];
  const totalStock = firstVariant?.sizes?.reduce((acc, s) => acc + s.stock, 0) || 0;
  const lowStock = totalStock > 0 && totalStock <= 5;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(wishlisted ? 'Removed from Wishlist' : 'Added to Wishlist', {
      icon: wishlisted ? '💔' : '❤️',
    });
  };

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative overflow-hidden bg-kalia-card rounded-2xl border border-kalia-border/50 group-hover:border-kalia-gold/30 transition-all duration-500 group-hover:shadow-[0_10px_40px_rgba(201,168,76,0.1)]">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={hovered ? hoverImage : mainImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kalia-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm ${
              wishlisted
                ? 'bg-kalia-pink text-white shadow-[0_0_20px_rgba(255,45,120,0.4)]'
                : 'bg-kalia-bg/40 text-kalia-offwhite hover:bg-kalia-pink/80 hover:text-white'
            }`}
          >
            <HiHeart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
          </motion.button>

          {totalStock === 0 && (
            <div className="absolute inset-0 bg-kalia-bg/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
              <span className="text-kalia-offwhite font-semibold uppercase tracking-wider text-sm border border-kalia-border px-4 py-2 rounded-full">
                Out of Stock
              </span>
            </div>
          )}

          {lowStock && totalStock > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-kalia-pink to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              Only {totalStock} left!
            </div>
          )}
        </div>

        <div className="mt-3 space-y-1.5 px-1">
          <div className="flex items-center gap-2">
            {firstVariant?.colorHex && (
              <span
                className="w-3 h-3 rounded-full border border-kalia-border shadow-sm"
                style={{ backgroundColor: firstVariant.colorHex }}
              />
            )}
            <p className="text-kalia-muted text-[10px] uppercase tracking-[0.15em]">{product.category}</p>
          </div>
          <h3 className="text-kalia-offwhite font-medium text-sm truncate group-hover:text-kalia-gold transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-kalia-gold font-bold text-base">₹{product.price.toLocaleString()}</p>
          <div className="flex flex-wrap gap-1">
            {allSizes.map(size => (
              <span
                key={size}
                className="text-[9px] px-2 py-0.5 border border-kalia-border/50 rounded-full text-kalia-muted uppercase tracking-wider"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
