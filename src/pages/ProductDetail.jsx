import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHeart, HiShare } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ImageGallery from '../components/ImageGallery';
import SizeSelector from '../components/SizeSelector';
import ColorSwatch from '../components/ColorSwatch';
import ProductCard from '../components/ProductCard';
import { getProduct, getProducts } from '../api/products';
import { useWishlist } from '../context/WishlistContext';

const WHATSAPP_NUMBER = '918803714000';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [related, setRelated] = useState([]);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = product ? isInWishlist(product._id) : false;

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then(res => {
        setProduct(res.data);
        if (res.data.variants?.[0]) {
          setSelectedVariant(0);
        }
        return getProducts({ category: res.data.category, limit: 4 });
      })
      .then(res => {
        setRelated(res.data.products.filter(p => p._id !== id));
      })
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 md:pt-28 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 py-10">
          <div className="skeleton rounded-2xl aspect-[3/4]" />
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4 rounded-xl" />
            <div className="skeleton h-6 w-1/4 rounded-xl" />
            <div className="skeleton h-20 w-full rounded-xl" />
            <div className="skeleton h-12 w-1/2 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const variant = product.variants[selectedVariant];
  const images = variant?.images || [];
  const sizes = variant?.sizes || [];
  const totalStock = sizes.reduce((acc, s) => acc + s.stock, 0);

  const stockLabel = totalStock === 0
    ? 'Out of Stock'
    : totalStock <= 5
    ? `Only ${totalStock} left!`
    : 'In Stock';

  const stockColor = totalStock === 0
    ? 'text-kalia-pink'
    : totalStock <= 5
    ? 'text-yellow-500'
    : 'text-kalia-neon';

  const handleWishlist = () => {
    toggleWishlist(product);
    toast.success(wishlisted ? 'Removed from Wishlist' : 'Added to Wishlist', {
      icon: wishlisted ? '💔' : '❤️',
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  const handleWhatsAppOrder = () => {
    if (!selectedSize) {
      toast.error('Please select a size first');
      return;
    }
    const color = variant?.color || '';
    const productUrl = window.location.href;
    const text =
      `Hi! I'd like to order:\n\n` +
      `*${product.name}*\n` +
      `Category: ${product.category}\n` +
      `Color: ${color}\n` +
      `Size: ${selectedSize}\n` +
      `Price: ₹${product.price.toLocaleString()}\n\n` +
      `Product Link:\n${productUrl}\n\n` +
      `Please confirm availability. Thank you!`;

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-10 py-10"
      >
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ImageGallery images={images} />
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <p className="outline-label mb-2">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-kalia-offwhite leading-tight">{product.name}</h1>
          </div>

          <p className="text-kalia-gold text-3xl font-bold">₹{product.price.toLocaleString()}</p>

          <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold ${stockColor}`}>{stockLabel}</span>
            {product.fabric && (
              <span className="text-xs px-3 py-1.5 border border-kalia-border/50 rounded-full text-kalia-muted glass-card">
                {product.fabric}
              </span>
            )}
          </div>

          <p className="text-kalia-muted leading-relaxed">{product.description}</p>

          {product.variants.length > 1 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-kalia-muted mb-3">Color — {variant?.color}</p>
              <ColorSwatch
                variants={product.variants}
                selected={selectedVariant}
                onSelect={(i) => {
                  setSelectedVariant(i);
                  setSelectedSize('');
                }}
              />
            </div>
          )}

          <div>
            <p className="text-xs uppercase tracking-wider text-kalia-muted mb-3">Size</p>
            <SizeSelector sizes={sizes} selected={selectedSize} onSelect={setSelectedSize} />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppOrder}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] text-white font-semibold hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all duration-500"
            >
              <FaWhatsapp size={18} />
              Order on WhatsApp
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWishlist}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-full border transition-all duration-500 ${
                wishlisted
                  ? 'bg-kalia-pink text-white border-kalia-pink shadow-[0_0_20px_rgba(255,45,120,0.3)]'
                  : 'border-kalia-border text-kalia-offwhite hover:border-kalia-pink hover:text-kalia-pink'
              }`}
            >
              <HiHeart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              {wishlisted ? 'Wishlisted' : 'Wishlist'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-kalia-border text-kalia-offwhite hover:border-kalia-gold hover:text-kalia-gold transition-all duration-500"
            >
              <HiShare size={18} />
              Share
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {related.length > 0 && (
        <section className="py-12 border-t border-kalia-border">
          <h2 className="font-display text-2xl md:text-3xl text-kalia-offwhite mb-8">
            You May Also <span className="gradient-text italic">Like</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
