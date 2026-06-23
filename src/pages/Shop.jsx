import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiFilter, HiX } from 'react-icons/hi';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { getProducts } from '../api/products';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    size: '',
    color: '',
    fabric: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const cat = searchParams.get('category') || '';
    setFilters(prev => prev.category !== cat ? { ...prev, category: cat } : prev);
    setPage(1);
  }, [searchParams]);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params = { page, limit: 12 };
    if (filters.category) params.category = filters.category;
    if (filters.size) params.size = filters.size;
    if (filters.color) params.color = filters.color;
    if (filters.fabric) params.fabric = filters.fabric;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (sort) params.sort = sort;

    getProducts(params)
      .then(res => {
        setProducts(res.data.products);
        setPages(res.data.pages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, filters, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  return (
    <div className="min-h-screen pt-24 md:pt-28 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8"
      >
        <p className="outline-label">Collection</p>
        <h1 className="font-display text-4xl md:text-5xl text-kalia-offwhite mt-2">
          {filters.category || 'All Products'}
        </h1>
      </motion.div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border border-kalia-border/50 px-5 py-2.5 rounded-full text-sm text-kalia-offwhite hover:border-kalia-gold hover:text-kalia-gold transition-all duration-300 md:hidden"
          >
            <HiFilter /> Filters
          </button>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-kalia-card border border-kalia-border/50 px-5 py-2.5 rounded-full text-sm text-kalia-offwhite focus:outline-none focus:border-kalia-gold transition-colors"
          >
            <option value="">Sort by: Latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
        <p className="text-kalia-muted text-sm">{products.length} products</p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-28">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', bounce: 0.2 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-kalia-bg p-6 overflow-y-auto border-r border-kalia-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl text-kalia-gold">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-kalia-muted hover:text-kalia-offwhite p-1">
                  <HiX size={20} />
                </button>
              </div>
              <FilterSidebar filters={filters} setFilters={setFilters} onClose={() => setShowFilters(false)} />
            </motion.div>
          </motion.div>
        )}

        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="skeleton rounded-2xl aspect-[3/4]" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 glass-card rounded-2xl"
            >
              <p className="text-kalia-muted text-lg mb-4">No products found</p>
              <button
                onClick={() => setFilters({ category: '', size: '', color: '', fabric: '', minPrice: '', maxPrice: '' })}
                className="text-kalia-gold text-sm hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {products.map((product, i) => (
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
              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {[...Array(pages)].map((_, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                        page === i + 1
                          ? 'bg-kalia-gold text-kalia-bg shadow-[0_0_20px_rgba(201,168,76,0.3)]'
                          : 'border border-kalia-border/50 text-kalia-offwhite hover:border-kalia-gold hover:text-kalia-gold'
                      }`}
                    >
                      {i + 1}
                    </motion.button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
