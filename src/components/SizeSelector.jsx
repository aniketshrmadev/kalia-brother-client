import { motion } from 'framer-motion';

export default function SizeSelector({ sizes = [], selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map(s => {
        const outOfStock = s.stock === 0;
        const isSelected = selected === s.size;
        return (
          <motion.button
            key={s.size}
            whileHover={!outOfStock ? { scale: 1.05 } : {}}
            whileTap={!outOfStock ? { scale: 0.95 } : {}}
            onClick={() => !outOfStock && onSelect(s.size)}
            disabled={outOfStock}
            className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
              isSelected
                ? 'bg-kalia-gold text-kalia-bg border-kalia-gold shadow-[0_0_20px_rgba(201,168,76,0.3)]'
                : outOfStock
                ? 'border-kalia-border/30 text-kalia-muted cursor-not-allowed opacity-40'
                : 'border-kalia-border/50 text-kalia-offwhite hover:border-kalia-gold hover:text-kalia-gold'
            }`}
          >
            {s.size}
          </motion.button>
        );
      })}
    </div>
  );
}
