// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { registerCitizen } from "../services/authApi";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (form.password !== form.confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    setLoading(true);
    try {
      // Calls /api/auth/register (we already defined registerCitizen)
      const data = await registerCitizen({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // Auto-login after register
      login(data.user, data.token);
      setMsg("Registration successful!");

      // Redirect based on role (new users are CITIZEN in our backend)
      if (data.user.role === "CITIZEN") navigate("/citizen/dashboard");
      else navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Failed to register. Try another email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <form className="card card-small" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <label>
          Full Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

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

        <label>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
          Already registered?{" "}
          <Link to="/login" className="btn-link">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
