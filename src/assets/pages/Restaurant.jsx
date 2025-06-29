// FICHIER : src/pages/Restaurant.jsx
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import MenuItem from "../components/MenuItem";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const sampleMenus = {
  "pizza-hut": [
    { id: "m1", name: "Pizza 4 Fromages", price: 1200, ingredients: "mozza, cheddar, parmesan", qty: 1 },
    { id: "m2", name: "Pizza Pepperoni", price: 1300, ingredients: "sauce tomate, pepperoni", qty: 1 },
  ],
  "sushi-bar": [
    { id: "m3", name: "Sushi Saumon", price: 1500, ingredients: "riz, saumon cru", qty: 1 },
    { id: "m4", name: "Sushi Mix", price: 1700, ingredients: "thon, saumon, avocat", qty: 1 },
  ],
  "burger-town": [
    { id: "m5", name: "Cheeseburger", price: 1000, ingredients: "viande, cheddar, pain", qty: 1 },
    { id: "m6", name: "Double Burger", price: 1400, ingredients: "double steak, sauce maison", qty: 1 },
  ]
};

export default function Restaurant() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [menu, setMenu] = useState(sampleMenus[id] || []);

  const handleQtyChange = (index, value) => {
    setMenu((prev) => {
      const newMenu = [...prev];
      newMenu[index].qty = value;
      return newMenu;
    });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.qty} x ${item.name} ajouté au panier`);
  };

  return (
    <motion.div
      className="p-4 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-2xl font-bold mb-4 capitalize">Menu - {id.replace(/-/g, ' ')}</h1>
      {menu.map((item, index) => (
        <MenuItem
          key={item.id}
          item={item}
          onQtyChange={(val) => handleQtyChange(index, val)}
          onAdd={() => handleAddToCart(item)}
        />
      ))}
    </motion.div>
  );
}