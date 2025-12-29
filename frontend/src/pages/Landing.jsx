import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css"; // make sure this path is correct

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-inner">
        {/* LEFT: HERO */}
        <section className="landing-hero">
          <div className="landing-badges">
            <span className="badge badge-info">E-Governance</span>
            <span className="badge badge-success">Secure</span>
            <span className="badge badge-warning">Role Based</span>
          </div>

          <h1 className="landing-title">
            Digital Business Registration & Renewal System
          </h1>

          <p className="landing-subtitle">
            A modern online portal for citizens to register and renew businesses
            digitally while government officers process applications efficiently,
            transparently, and securely.
          </p>

          <div className="landing-actions">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline">
              Register
            </Link>
          </div>

          <ul className="landing-points">
            <li>✅ Online submission & tracking</li>
            <li>✅ Officer review with remarks and decisions</li>
            <li>✅ Audit-friendly workflow & transparency</li>
            <li>✅ Notifications-ready architecture</li>
          </ul>

          <p className="landing-note">
            Built as an academic e-governance project demonstrating real-world
            workflows with role-based access and scalable architecture.
          </p>
        </section>

        {/* RIGHT: CARDS */}
        <section className="landing-right">
          <div className="landing-grid">
            <div className="card landing-card">
              <h3>For Citizens</h3>
              <p>Apply for new registrations, submit renewals, and track status anytime.</p>
              <div className="landing-tags">
                <span className="tag">Apply Online</span>
                <span className="tag">Track Status</span>
                <span className="tag">Renew Fast</span>
              </div>
            </div>

            <div className="card landing-card">
              <h3>For Officers</h3>
              <p>Review applications, approve/reject with remarks, and maintain workflow.</p>
              <div className="landing-tags">
                <span className="tag">Approve</span>
                <span className="tag">Reject</span>
                <span className="tag">Remarks</span>
              </div>
            </div>

            <div className="card landing-card">
              <h3>For Administration</h3>
              <p>Monitor system usage, manage users, and enable future reporting.</p>
              <div className="landing-tags">
                <span className="tag">Users</span>
                <span className="tag">Reports</span>
                <span className="tag">Analytics</span>
              </div>
            </div>

            <div className="card landing-card landing-card--highlight">
              <h3>Key Features</h3>
              <p className="muted">
                Designed for performance, security, and real-world workflow handling.
              </p>
              <ul className="feature-list">
                <li>📌 Role-based dashboards</li>
                <li>🔐 Secure login & protected routes</li>
                <li>🧾 Digital recordkeeping & history</li>
                <li>⚙️ Extensible for payments & verification</li>
              </ul>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div className="card landing-how">
            <h3>How It Works</h3>
            <div className="how-steps">
              <div className="how-step">
                <span className="how-num">1</span>
                <div>
                  <strong>Citizen Applies</strong>
                  <p className="muted">Submit registration/renewal form with required details.</p>
                </div>
              </div>
              <div className="how-step">
                <span className="how-num">2</span>
                <div>
                  <strong>Officer Reviews</strong>
                  <p className="muted">Verify and approve/reject with remarks for transparency.</p>
                </div>
              </div>
              <div className="how-step">
                <span className="how-num">3</span>
                <div>
                  <strong>Status Updated</strong>
                  <p className="muted">Applicant sees the latest status and remarks in dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
