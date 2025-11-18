// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="page">
      <h1>Digital Business Registration & Renewal System</h1>
      <p>
        This portal allows citizens to register new businesses, renew existing
        registrations, and track application status online. Government officers
        can review, approve, and manage applications efficiently.
      </p>

      <div className="dashboard-actions" style={{ marginTop: "1rem" }}>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>

        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>
    </div>
  );
}
