// src/components/layout/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return null;

  return (
    <aside className="sidebar">
      {user.role === "CITIZEN" && (
        <ul>
          <li>
            <Link to="/citizen/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/citizen/new-registration">New Registration</Link>
          </li>
          <li>
            <Link to="/citizen/renewal">Renewal</Link>
          </li>
        </ul>
      )}

      {user.role === "OFFICER" && (
        <ul>
          <li>
            <Link to="/officer/dashboard">Officer Dashboard</Link>
          </li>
        </ul>
      )}

      {user.role === "ADMIN" && (
        <ul>
          <li>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          </li>
        </ul>
      )}
    </aside>
  );
}
