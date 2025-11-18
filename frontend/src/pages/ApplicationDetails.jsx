// src/pages/ApplicationDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  getApplicationById,
  approveApplication,
  rejectApplication,
} from "../services/applicationApi";

export default function ApplicationDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [application, setApplication] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const isOfficer = user?.role === "OFFICER";

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getApplicationById(id);
        setApplication(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load application.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleApprove = async () => {
    setActionLoading(true);
    setMsg("");
    setError("");
    try {
      await approveApplication(id, remarks);
      setMsg("Application approved.");
    } catch (err) {
      console.error(err);
      setError("Failed to approve application.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    setMsg("");
    setError("");
    try {
      await rejectApplication(id, remarks);
      setMsg("Application rejected.");
    } catch (err) {
      console.error(err);
      setError("Failed to reject application.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="page">Loading...</div>;
  if (!application) return <div className="page">Application not found.</div>;

  return (
    <div className="page">
      <h1>Application Details</h1>
      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <h2>Basic Info</h2>
        <p>
          <strong>ID:</strong> {application.id}
        </p>
        <p>
          <strong>Type:</strong> {application.type}
        </p>
        <p>
          <strong>Status:</strong> {application.status}
        </p>
        <p>
          <strong>Submitted At:</strong> {application.submitted_at}
        </p>
      </div>

      <div className="card">
        <h2>Business Info</h2>
        <p>
          <strong>Registration No:</strong> {application.business?.registration_no}
        </p>
        <p>
          <strong>Name:</strong> {application.business?.business_name}
        </p>
        <p>
          <strong>Type:</strong> {application.business?.business_type}
        </p>
        <p>
          <strong>Address:</strong> {application.business?.address}
        </p>
      </div>

      {isOfficer && application.status === "PENDING" && (
        <div className="card">
          <h2>Officer Action</h2>
          <label>
            Remarks
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
            />
          </label>
          <div className="dashboard-actions">
            <button
              className="btn btn-primary"
              onClick={handleApprove}
              disabled={actionLoading}
            >
              Approve
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleReject}
              disabled={actionLoading}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
