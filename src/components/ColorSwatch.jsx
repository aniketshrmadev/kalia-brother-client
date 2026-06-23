import { motion } from 'framer-motion';

export default function ColorSwatch({ variants = [], selected, onSelect }) {
  return (
    <div className="flex gap-3">
      {variants.map((v, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(i)}
          className={`w-9 h-9 rounded-full border-2 transition-all duration-300 ${
            selected === i
              ? 'border-kalia-gold shadow-[0_0_15px_rgba(201,168,76,0.4)] scale-110'
              : 'border-kalia-border/50 hover:border-kalia-gold/50'
          }`}
          style={{ backgroundColor: v.colorHex }}
          title={v.color}
        />
      ))}
    </div>
  );
}
