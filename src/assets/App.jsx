// FICHIER : src/App.jsx
import AppRouter from "./routes/AppRouter";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <AnimatePresence mode="wait">
          <AppRouter />
        </AnimatePresence>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
