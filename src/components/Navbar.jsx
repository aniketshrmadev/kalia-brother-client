import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiHeart, HiSearch, HiUser } from 'react-icons/hi';
import { useWishlist } from '../context/WishlistContext';
import Logo from './Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'T-Shirts', path: '/shop?category=T-Shirts' },
  { name: 'Shirts', path: '/shop?category=Shirts' },
  { name: 'Pants', path: '/shop?category=Pants' },
  { name: 'Shorts', path: '/shop?category=Shorts' },
  { name: 'Watches', path: '/shop?category=Watches' },
  { name: 'Perfume', path: '/shop?category=Perfume' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { wishlist } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-kalia-bg/80 backdrop-blur-xl border-b border-kalia-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center group">
              <Logo className="h-10 w-auto md:h-12" />
            </Link>

            <div className="hidden md:flex items-center gap-0.5 overflow-x-auto no-scrollbar max-w-[500px] lg:max-w-none">
              {navLinks.map(link => {
                const isActive = location.pathname + location.search === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-2.5 lg:px-4 py-2 text-[11px] lg:text-sm uppercase tracking-[0.08em] lg:tracking-[0.12em] transition-colors duration-300 rounded-full whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? 'text-kalia-gold'
                        : 'text-kalia-muted hover:text-kalia-offwhite'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 bg-kalia-gold/10 border border-kalia-gold/20 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/search"
                className="p-2.5 rounded-full text-kalia-muted hover:text-kalia-gold hover:bg-kalia-gold/10 transition-all duration-300"
              >
                <HiSearch size={20} />
              </Link>
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-full text-kalia-muted hover:text-kalia-pink hover:bg-kalia-pink/10 transition-all duration-300"
              >
                <HiHeart size={20} />
                {wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-kalia-pink text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </Link>
              <Link
                to="/admin/login"
                className="hidden md:flex p-2.5 rounded-full text-kalia-muted hover:text-kalia-neon hover:bg-kalia-neon/10 transition-all duration-300"
              >
                <HiUser size={20} />
              </Link>
              <button
                className="md:hidden p-2.5 rounded-full text-kalia-muted hover:text-kalia-gold hover:bg-kalia-gold/10 transition-all duration-300"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="mx-4 mt-2 glass-card rounded-2xl p-6 border border-kalia-border/50 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm uppercase tracking-[0.12em] transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'text-kalia-gold bg-kalia-gold/10'
                          : 'text-kalia-offwhite hover:bg-kalia-card hover:text-kalia-gold'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-kalia-border/50">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-kalia-neon hover:bg-kalia-neon/10 transition-all"
                >
                  <HiUser size={18} /> Admin
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
