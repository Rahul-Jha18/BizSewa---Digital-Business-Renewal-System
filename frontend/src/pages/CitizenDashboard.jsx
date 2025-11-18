// src/pages/CitizenDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../services/applicationApi";

export default function CitizenDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyApplications();
        setApplications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="page">
      <h1>Citizen Dashboard</h1>
      <div className="dashboard-actions">
        <Link to="/citizen/new-registration" className="btn btn-primary">
          New Registration
        </Link>
        <Link to="/citizen/renewal" className="btn btn-secondary">
          Renew Business
        </Link>
      </div>

      <h2>My Applications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Submitted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.type}</td>
                <td>{app.status}</td>
                <td>{app.submitted_at}</td>
                <td>
                  <Link
                    to={`/citizen/applications/${app.id}`}
                    className="btn btn-link"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
