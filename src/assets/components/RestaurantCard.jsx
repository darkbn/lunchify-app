// FICHIER : src/components/RestaurantCard.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function RestaurantCard({ resto }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/restaurant/${resto.id}`)}
      className="bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden transition-transform"
    >
      <img src={resto.image} alt={resto.name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{resto.name}</h2>
      </div>
    </motion.div>
  );
}