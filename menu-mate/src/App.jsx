// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";

import "./App.css";

function App() {
  // global-ish state (simple)
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // restore persisted favorites/cart if present
    const f = localStorage.getItem("mm_favorites");
    const c = localStorage.getItem("mm_cart");
    if (f) setFavorites(JSON.parse(f));
    if (c) setCart(JSON.parse(c));
  }, []);

  useEffect(() => {
    localStorage.setItem("mm_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("mm_cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    if (!cart.find((i) => i.id === item.id)) setCart([...cart, item]);
  }

  function removeFromCart(id) {
    setCart(cart.filter((i) => i.id !== id));
  }

  function toggleFavorite(item) {
    if (favorites.find((f) => f.id === item.id)) {
      setFavorites(favorites.filter((f) => f.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  }

  return (
    <Router>
      <div className="app-root">
        <Header />
        <Navbar />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/menu"
              element={
                <Menu
                  addToCart={addToCart}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/cart"
              element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
