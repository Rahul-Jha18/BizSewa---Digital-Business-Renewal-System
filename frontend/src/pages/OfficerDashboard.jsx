// src/pages/OfficerDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOfficerApplications } from "../services/applicationApi";

export default function OfficerDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOfficerApplications();
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
      <h1>Officer Dashboard</h1>
      <h2>Pending Applications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No pending applications.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Business Name</th>
              <th>Type</th>
              <th>Submitted By</th>
              <th>Submitted At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.business_name}</td>
                <td>{app.type}</td>
                <td>{app.applicant_name}</td>
                <td>{app.submitted_at}</td>
                <td>{app.status}</td>
                <td>
                  <Link
                    to={`/officer/applications/${app.id}`}
                    className="btn btn-link"
                  >
                    Review
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
