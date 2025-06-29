// FICHIER : src/pages/Home.jsx
import { motion } from "framer-motion";
import RestaurantCard from "../components/RestaurantCard";

const restaurants = [
  { id: "pizza-hut", name: "Pizza Hut", image: "/images/pizza.jpg" },
  { id: "sushi-bar", name: "Sushi Bar", image: "/images/sushi.jpg" },
  { id: "burger-town", name: "Burger Town", image: "/images/burger.jpg" },
];

export default function Home() {
  return (
    <motion.div
      className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {restaurants.map((resto) => (
        <RestaurantCard key={resto.id} resto={resto} />
      ))}
    </motion.div>
  );
}