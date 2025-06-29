// FICHIER : src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { motion } from "framer-motion";

export default function Header() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <motion.header
      className="bg-white shadow p-4 flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link to="/" className="text-xl font-bold text-blue-600">Lunchify</Link>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Accueil</Link>
        <Link to="/cart" className="hover:underline">Panier</Link>
        <Link to="/admin" className="hover:underline">Admin</Link>
        <button onClick={logout} className="text-red-500 hover:underline">Déconnexion</button>
      </nav>
    </motion.header>
  );
}