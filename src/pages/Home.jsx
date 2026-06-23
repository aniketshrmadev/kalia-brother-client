import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowRight, HiShieldCheck, HiCollection, HiSparkles } from 'react-icons/hi';
import { TbShirt, TbShirtSport, TbJacket, TbHanger, TbShirtFilled } from 'react-icons/tb';
import ProductCard from '../components/ProductCard';
import Logo from '../components/Logo';
import { getProducts } from '../api/products';

const categories = [
  { name: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', link: '/shop?category=T-Shirts', color: 'from-kalia-gold/30' },
  { name: 'Shirts', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop', link: '/shop?category=Shirts', color: 'from-kalia-cyan/30' },
  { name: 'Pants', img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop', link: '/shop?category=Pants', color: 'from-kalia-pink/30' },
  { name: 'Shorts', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop', link: '/shop?category=Shorts', color: 'from-kalia-purple/30' },
  { name: 'Watches', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop', link: '/shop?category=Watches', color: 'from-kalia-neon/30' },
  { name: 'Belts', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', link: '/shop?category=Belts', color: 'from-kalia-gold/30' },
  { name: 'Perfume', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop', link: '/shop?category=Perfume', color: 'from-kalia-pink/30' },
  { name: 'Accessories', img: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=500&fit=crop', link: '/shop?category=Accessories', color: 'from-kalia-cyan/30' },
];

const reasons = [
  { icon: HiShieldCheck, title: 'Quality First', desc: 'Premium fabrics, rigorous quality checks on every stitch.', gradient: 'from-kalia-gold to-kalia-neon' },
  { icon: HiCollection, title: 'Infinite Variety', desc: 'From timeless classics to bold trends — we have it all.', gradient: 'from-kalia-pink to-kalia-purple' },
  { icon: HiSparkles, title: 'Local Legacy', desc: 'Trusted by families for over two decades of style.', gradient: 'from-kalia-cyan to-kalia-gold' },
];

const marqueeItems = [
  'Premium Fabrics', 'Free Shipping', 'Handcrafted', 'Since 2000',
  'Quality Wear', 'Trendy Styles', 'Pan-India', '24/7 Support',
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    getProducts({ featured: 'true', limit: 8 })
      .then(res => setFeatured(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Colorful gradient orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-kalia-gold/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-kalia-pink/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-kalia-purple/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '-4s' }} />
        <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-kalia-cyan/15 rounded-full blur-[90px] animate-float" style={{ animationDelay: '-6s' }} />

        {/* Background KB logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <svg viewBox="0 0 100 120" className="w-[200px] md:w-[300px] lg:w-[400px] h-auto opacity-[0.06]">
            <defs>
              <linearGradient id="bgShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A84C"/>
                <stop offset="50%" stopColor="#E8D48B"/>
                <stop offset="100%" stopColor="#C9A84C"/>
              </linearGradient>
            </defs>
            <path d="M50 5 L90 20 L90 65 C90 90 72 110 50 115 C28 110 10 90 10 65 L10 20 Z" fill="none" stroke="url(#bgShieldGrad)" strokeWidth="3"/>
            <path d="M50 12 L82 24 L82 65 C82 85 68 102 50 107 C32 102 18 85 18 65 L18 24 Z" fill="url(#bgShieldGrad)" opacity="0.15"/>
            <text x="50" y="72" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="42" fontWeight="700" fill="url(#bgShieldGrad)" letterSpacing="2">KB</text>
          </svg>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-kalia-bg/60 via-transparent to-kalia-bg" />

        {/* Animated ring decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] border border-kalia-gold/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] border border-kalia-pink/10 rounded-full"
        />

        {/* Floating clothing icons */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[15%] left-[8%] text-kalia-gold/20">
          <TbShirt size={40} />
        </motion.div>
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute top-[25%] right-[12%] text-kalia-pink/20">
          <TbShirtSport size={36} />
        </motion.div>
        <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-[30%] left-[15%] text-kalia-purple/20">
          <TbJacket size={34} />
        </motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} className="absolute bottom-[25%] right-[8%] text-kalia-cyan/20">
          <TbHanger size={38} />
        </motion.div>
        <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute top-[60%] left-[5%] text-kalia-gold/15">
          <TbShirtFilled size={32} />
        </motion.div>
        <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} className="absolute top-[10%] right-[25%] text-kalia-neon/15">
          <TbShirt size={30} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-4"
        >
          {/* Logo + Shop Name */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring', bounce: 0.3 }}
            className="mb-6"
          >
            <Logo className="h-20 md:h-28 lg:h-32 w-auto mx-auto" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-kalia-muted text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed tracking-wide"
          >
            Premium clothing for Men & Boys. Crafted with legacy since 2000.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/shop"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-kalia-gold via-amber-500 to-kalia-gold text-kalia-bg px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(201,168,76,0.5)] bg-[length:200%_100%] hover:bg-right"
            >
              <span className="relative z-10">Shop Now</span>
              <HiArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border-2 border-kalia-gold/50 text-kalia-offwhite px-10 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-kalia-gold/10 hover:border-kalia-gold transition-all duration-500"
            >
              Explore Collection
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-kalia-muted text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-kalia-muted/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-kalia-gold rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Marquee */}
      <div className="py-5 border-y border-kalia-border overflow-hidden bg-kalia-card/50">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-6 mx-6 text-sm uppercase tracking-[0.2em] text-kalia-muted/60">
              <span className="w-1.5 h-1.5 rounded-full bg-kalia-gold/40" />
              {item}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}</style>
      </div>

      {/* Categories */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="outline-label text-center mb-2">Browse</p>
          <h2 className="font-display text-4xl md:text-5xl text-kalia-offwhite">
            Shop by <span className="gradient-text italic">Category</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                to={cat.link}
                className="group block relative overflow-hidden rounded-2xl aspect-[3/4] neon-border"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-transparent to-kalia-bg/80 transition-opacity duration-500 group-hover:opacity-80`} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-display text-2xl text-kalia-offwhite mb-1">{cat.name}</p>
                  <div className="flex items-center gap-2 text-kalia-gold text-xs uppercase tracking-wider opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Explore <HiArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="outline-label text-center mb-2">New Arrivals</p>
          <h2 className="font-display text-4xl md:text-5xl text-kalia-offwhite">
            Featured <span className="shimmer-text italic font-semibold">Collection</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton rounded-2xl aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {featured.length === 0 && !loading && (
          <div className="text-center py-16 glass-card rounded-2xl">
            <p className="text-kalia-muted text-lg mb-2">No products yet</p>
            <p className="text-kalia-muted/60 text-sm">Add products from the admin dashboard</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 border border-kalia-gold/30 text-kalia-gold px-10 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-kalia-gold hover:text-kalia-bg hover:border-kalia-gold transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          >
            View All Products
            <HiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      {/* Why Us */}
      <section className="py-24 px-4 bg-kalia-card/50 border-y border-kalia-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="outline-label text-center mb-2">Why Us</p>
            <h2 className="font-display text-4xl md:text-5xl text-kalia-offwhite">
              The Kalia Brother <span className="gradient-text italic">Promise</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass-card rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-500"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${r.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <r.icon size={28} className="text-kalia-bg" />
                </div>
                <h3 className="font-display text-xl text-kalia-offwhite mb-3">{r.title}</h3>
                <p className="text-kalia-muted text-sm leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-card rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-kalia-gold/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-kalia-purple/10 rounded-full blur-[60px]" />
          <div className="relative z-10">
            <p className="outline-label mb-3">Ready to elevate your style?</p>
            <h2 className="font-display text-3xl md:text-5xl text-kalia-offwhite mb-6">
              Find Your <span className="gradient-text italic">Perfect Look</span>
            </h2>
            <p className="text-kalia-muted max-w-lg mx-auto mb-8">
              Browse our curated collections and discover pieces that speak to your unique style.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-kalia-gold text-kalia-bg px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-all duration-500"
            >
              Start Shopping <HiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 max-w-7xl mx-auto border-t border-kalia-border">
        <div className="grid md:grid-cols-3 gap-12 mb-10">
          <div>
            <Logo className="h-12 w-auto mb-4" />
            <p className="text-kalia-muted text-sm leading-relaxed">
              Premium clothing for every occasion. Crafting style with legacy since 2000.
            </p>
          </div>
          <div>
            <h4 className="outline-label mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Shop', to: '/shop' },
                { label: 'T-Shirts', to: '/shop?category=T-Shirts' },
                { label: 'Shirts', to: '/shop?category=Shirts' },
                { label: 'Pants', to: '/shop?category=Pants' },
                { label: 'Shorts', to: '/shop?category=Shorts' },
                { label: 'Watches', to: '/shop?category=Watches' },
                { label: 'Perfume', to: '/shop?category=Perfume' },
              ].map(link => (
                <Link key={link.label} to={link.to} className="block text-kalia-muted text-sm hover:text-kalia-gold transition-colors duration-300 hover:translate-x-1 transform">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="outline-label mb-4">Contact</h4>
            <div className="space-y-3 text-kalia-muted text-sm">
              <p>123 Fashion Street, Mumbai</p>
              <p>+91 98765 43210</p>
              <p>hello@kaliabrother.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-kalia-border pt-6 text-center text-kalia-muted/50 text-xs tracking-wider">
          © 2026 Kalia Brother. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
