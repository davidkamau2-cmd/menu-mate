// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          🍽️ MenuMate
        </NavLink>

        <div className="nav-links">
          <NavLink to="/menu" className={({isActive}) => (isActive ? "active" : "")}>Menu</NavLink>
          <NavLink to="/favorites" className={({isActive}) => (isActive ? "active" : "")}>Favorites</NavLink>
          <NavLink to="/cart" className={({isActive}) => (isActive ? "active" : "")}>Cart</NavLink>
          <NavLink to="/admin" className={({isActive}) => (isActive ? "active" : "")}>Admin</NavLink>
          <NavLink to="/login" className={({isActive}) => (isActive ? "active" : "")}>Login</NavLink>
        </div>
      </div>
    </nav>
  );
}
