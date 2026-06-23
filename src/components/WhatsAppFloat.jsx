import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '918803714000';

export default function WhatsAppFloat() {
  const message = encodeURIComponent("Hi! I'm interested in your products. Can you help me?");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', bounce: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-shadow duration-300"
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
}
