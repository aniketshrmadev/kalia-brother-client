import { useState, useEffect } from 'react';
import { HiX, HiFilter } from 'react-icons/hi';

const categories = ['T-Shirts', 'Shirts', 'Pants', 'Shorts', 'Watches', 'Belts', 'Perfume', 'Accessories'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const fabrics = ['Cotton', 'Silk', 'Linen', 'Polyester', 'Wool', 'Denim', 'Chiffon', 'Georgette'];
const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Navy', hex: '#1B2A5E' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Gold', hex: '#C9A84C' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Brown', hex: '#92400E' },
  { name: 'Grey', hex: '#6B7280' },
];

export default function FilterSidebar({ filters, setFilters, onClose }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const update = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const apply = () => {
    setFilters(localFilters);
    if (onClose) onClose();
  };

  const clear = () => {
    const empty = { category: '', size: '', color: '', fabric: '', minPrice: '', maxPrice: '' };
    setLocalFilters(empty);
    setFilters(empty);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="outline-label flex items-center gap-2">
          <HiFilter /> Filters
        </h3>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-kalia-offwhite p-1">
            <HiX size={20} />
          </button>
        )}
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-wider text-kalia-muted mb-3">Category</h4>
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => update('category', localFilters.category === cat ? '' : cat)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                localFilters.category === cat
                  ? 'bg-kalia-gold text-kalia-bg font-semibold'
                  : 'text-kalia-offwhite hover:bg-kalia-card'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-wider text-kalia-muted mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => update('size', localFilters.size === size ? '' : size)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                localFilters.size === size
                  ? 'bg-kalia-gold text-kalia-bg border-kalia-gold'
                  : 'border-kalia-border/50 text-kalia-offwhite hover:border-kalia-gold'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-wider text-kalia-muted mb-3">Fabric</h4>
        <div className="flex flex-wrap gap-2">
          {fabrics.map(fab => (
            <button
              key={fab}
              onClick={() => update('fabric', localFilters.fabric === fab ? '' : fab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                localFilters.fabric === fab
                  ? 'bg-kalia-gold text-kalia-bg border-kalia-gold'
                  : 'border-kalia-border/50 text-kalia-offwhite hover:border-kalia-gold'
              }`}
            >
              {fab}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-wider text-kalia-muted mb-3">Color</h4>
        <div className="flex flex-wrap gap-2.5">
          {colors.map(c => (
            <button
              key={c.hex}
              onClick={() => update('color', localFilters.color === c.hex ? '' : c.hex)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                localFilters.color === c.hex ? 'border-kalia-gold scale-110 shadow-[0_0_10px_rgba(201,168,76,0.4)]' : 'border-kalia-border/50'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-wider text-kalia-muted mb-3">Price Range</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.minPrice}
            onChange={e => update('minPrice', e.target.value)}
            className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-3 py-2 text-sm text-kalia-offwhite focus:outline-none focus:border-kalia-gold transition-colors"
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.maxPrice}
            onChange={e => update('maxPrice', e.target.value)}
            className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-3 py-2 text-sm text-kalia-offwhite focus:outline-none focus:border-kalia-gold transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={apply}
          className="flex-1 bg-kalia-gold text-kalia-bg py-2.5 rounded-full font-semibold text-sm hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300"
        >
          Apply
        </button>
        <button
          onClick={clear}
          className="flex-1 border border-kalia-border/50 text-kalia-offwhite py-2.5 rounded-full text-sm hover:border-kalia-gold hover:text-kalia-gold transition-all duration-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
