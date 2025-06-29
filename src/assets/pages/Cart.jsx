// FICHIER : src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedButton from "../components/AnimatedButton";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [cash, setCash] = useState(true);
  const [needChange, setNeedChange] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleSubmit = async () => {
    if (!user) return toast.error("Vous devez être connecté");

    try {
      await addDoc(collection(db, "orders"), {
        userEmail: user.email,
        createdAt: Timestamp.now(),
        items: cart,
        total,
        payment: cash ? "cash" : "unknown",
        change: needChange,
      });
      clearCart();
      toast.success("Commande envoyée avec succès !");
    } catch (err) {
      console.error("Erreur Firestore:", err);
      toast.error("Erreur lors de l'envoi de la commande");
    }
  };

  return (
    <motion.div
      className="p-4 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4">Mon Panier</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{item.name}</p>
              <p>{item.qty} x {item.price} DA</p>
              <p className="font-bold">Total : {item.qty * item.price} DA</p>
            </div>
          ))}

          <div className="mt-4">
            <p className="text-lg font-bold">Total Général : {total} DA</p>

            <div className="mt-4">
              <label className="block font-medium mb-1">Paiement :</label>
              <div className="space-x-4">
                <label>
                  <input type="radio" checked={cash} onChange={() => setCash(true)} /> Espèce
                </label>
              </div>

              {cash && (
                <div className="mt-2">
                  <label>
                    <input type="checkbox" checked={needChange} onChange={() => setNeedChange(!needChange)} /> J’ai besoin de monnaie
                  </label>
                </div>
              )}
            </div>

            <AnimatedButton onClick={handleSubmit} className="mt-4">
              Valider la commande
            </AnimatedButton>
          </div>
        </div>
      )}
    </motion.div>
  );
}