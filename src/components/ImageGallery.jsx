import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ImageGallery({ images = [] }) {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(false);

  const NO_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800'%3E%3Crect fill='%23141414' width='600' height='800'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%23C9A84C' font-family='sans-serif' font-size='24'%3ENo Image%3C/text%3E%3Ctext x='50%25' y='56%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='sans-serif' font-size='14'%3EUpload a photo%3C/text%3E%3C/svg%3E";
  if (!images.length) {
    images = [NO_IMAGE];
  }

  return (
    <div className="space-y-4">
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-kalia-card border border-kalia-border/50 cursor-zoom-in"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={images[selected]}
          alt="Product"
          className="w-full aspect-[3/4] object-cover"
          animate={{ scale: zoom ? 1.5 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div className="absolute bottom-4 left-4 text-kalia-muted/50 text-xs">
          {selected + 1} / {images.length}
        </div>
      </motion.div>

      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selected === i
                  ? 'border-kalia-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]'
                  : 'border-kalia-border/30 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
