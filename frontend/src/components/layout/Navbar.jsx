// src/components/layout/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          e-Gov Business Portal
        </Link>
      </div>
      <div className="navbar-right">
        {isAuthenticated && user ? (
          <>
            <span className="navbar-user">
              {user.name} ({user.role})
            </span>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
    