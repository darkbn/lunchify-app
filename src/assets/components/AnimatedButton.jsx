// FICHIER : src/components/AnimatedButton.jsx
import { motion } from "framer-motion";

export default function AnimatedButton({ children, onClick, className }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded bg-blue-600 text-white ${className}`}
    >
      {children}
    </motion.button>
  );
}
