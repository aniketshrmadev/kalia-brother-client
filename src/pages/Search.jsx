import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/products';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setLoading(true);
      getProducts({ search: query, limit: 20 })
        .then(res => setResults(res.data.products))
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timerRef.current);
  }, [query]);

  return (
    <div className="min-h-screen pt-24 md:pt-28 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8 max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <p className="outline-label mb-2">Search</p>
          <h1 className="font-display text-3xl md:text-4xl text-kalia-offwhite">
            Find Your <span className="gradient-text italic">Style</span>
          </h1>
        </div>

        <div className="relative mb-10">
          <HiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-kalia-muted" size={22} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-kalia-card border border-kalia-border/50 rounded-2xl pl-14 pr-6 py-5 text-kalia-offwhite text-lg focus:outline-none focus:border-kalia-gold focus:shadow-[0_0_20px_rgba(201,168,76,0.1)] transition-all duration-500"
          />
        </div>

        <div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton rounded-2xl aspect-[3/4]" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {results.map((product, i) => (
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
          ) : query.trim() ? (
            <div className="text-center py-16 glass-card rounded-2xl">
              <p className="text-kalia-muted text-lg">No results for "{query}"</p>
            </div>
          ) : (
            <div className="text-center py-16 glass-card rounded-2xl">
              <p className="text-kalia-muted/60 text-lg">Start typing to search</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
