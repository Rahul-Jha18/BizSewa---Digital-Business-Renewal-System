// src/pages/Login.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { loginRequest } from "../services/authApi";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginRequest(form.email, form.password);
      login(data.user, data.token);

      if (from) {
        navigate(from, { replace: true });
        return;
      }

      if (data.user.role === "CITIZEN") navigate("/citizen/dashboard");
      else if (data.user.role === "OFFICER") navigate("/officer/dashboard");
      else if (data.user.role === "ADMIN") navigate("/admin/dashboard");
      else navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <form className="card card-small" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="alert alert-error">{error}</div>}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
          Not registered yet?{" "}
          <Link to="/register" className="btn-link">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
