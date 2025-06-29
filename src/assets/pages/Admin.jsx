import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { motion } from "framer-motion";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setOrders(results);
      setFiltered(results);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    let data = [...orders];
    if (searchEmail) {
      data = data.filter((o) =>
        o.userEmail.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }
    if (dateFrom) {
      data = data.filter((o) => o.createdAt >= new Date(dateFrom));
    }
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59);
      data = data.filter((o) => o.createdAt <= end);
    }
    setFiltered(data);
  }, [searchEmail, dateFrom, dateTo, orders]);

  return (
    <motion.div className="p-6 max-w-6xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold mb-4">📋 Commandes des employés</h1>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher par email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Aucune commande trouvée.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow-sm bg-white">
              <p className="font-semibold">👤 {order.userEmail}</p>
              <p className="text-sm text-gray-500">🕒 {order.createdAt?.toLocaleString()}</p>
              <ul className="mt-2 list-disc ml-6">
                {order.items.map((item, i) => (
                  <li key={i}>{item.qty} x {item.name} - {item.price * item.qty} DA</li>
                ))}
              </ul>
              <p className="mt-2 font-bold">💰 Total : {order.total} DA</p>
              <p>💵 Paiement : {order.payment} {order.change ? "(avec monnaie)" : ""}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
