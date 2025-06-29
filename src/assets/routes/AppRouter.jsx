import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Admin from "../pages/Admin";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-hot-toast";

export default function AppRouter() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/restaurant/:id" element={<PrivateRoute><Restaurant /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute adminOnly><Admin /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
