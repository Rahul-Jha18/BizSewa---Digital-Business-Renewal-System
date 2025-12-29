import React, { useMemo, useState } from "react";

const initial = {
  // Business
  business_name: "",
  business_type: "",
  registration_type: "New",
  sector: "",
  pan_vat: "",
  proposed_capital: "",
  employees_count: "",

  // Address
  province: "",
  district: "",
  municipality: "",
  ward_no: "",
  street: "",
  house_no: "",
  office_phone: "",

  // Owner
  owner_full_name: "",
  owner_father_name: "",
  owner_grandfather_name: "",
  owner_citizenship_no: "",
  owner_citizenship_issue_district: "",
  owner_phone: "",
  owner_email: "",

  // Dates
  business_start_date: "",
};

const BUSINESS_TYPES = [
  "Sole Proprietorship",
  "Partnership",
  "Private Limited",
  "Public Limited",
  "Co-operative",
  "Other",
];

const SECTORS = [
  "Retail",
  "Service",
  "Manufacturing",
  "Tourism",
  "IT/Software",
  "Construction",
  "Agriculture",
  "Other",
];

export default function BusinessForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [doc, setDoc] = useState({
    citizenship_front: null,
    citizenship_back: null,
    tax_pan: null,
    registration_letter: null,
    other_doc: null,
  });

  const requiredFields = useMemo(
    () => [
      "business_name",
      "business_type",
      "sector",
      "province",
      "district",
      "municipality",
      "ward_no",
      "owner_full_name",
      "owner_father_name",
      "owner_grandfather_name",
      "owner_citizenship_no",
      "owner_citizenship_issue_district",
      "owner_phone",
      "owner_email",
    ],
    []
  );

  const validate = () => {
    const e = {};

    requiredFields.forEach((k) => {
      if (!String(form[k] ?? "").trim()) e[k] = "Required";
    });

    // Email format
    if (form.owner_email && !/^\S+@\S+\.\S+$/.test(form.owner_email)) {
      e.owner_email = "Invalid email";
    }

    // Phone basic validation (Nepal: 10 digits typical; allow +977)
    if (form.owner_phone && !/^(?:\+977)?\d{10}$/.test(form.owner_phone.replace(/\s/g, ""))) {
      e.owner_phone = "Invalid phone";
    }

    // Ward numeric
    if (form.ward_no && !/^\d+$/.test(form.ward_no)) e.ward_no = "Must be a number";

    // Capital numeric
    if (form.proposed_capital && isNaN(Number(form.proposed_capital))) {
      e.proposed_capital = "Must be numeric";
    }

    // Employees numeric
    if (form.employees_count && isNaN(Number(form.employees_count))) {
      e.employees_count = "Must be numeric";
    }

    // Documents (if you want to make required)
    // Example: require citizenship front/back
    if (!doc.citizenship_front) e.citizenship_front = "Citizenship front required";
    if (!doc.citizenship_back) e.citizenship_back = "Citizenship back required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;
    setDoc((p) => ({ ...p, [name]: file }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // If you are uploading files, you should send FormData
    // Otherwise send JSON only.
    // Here: FormData to support documents.
    const fd = new FormData();

    // add all fields
    Object.keys(form).forEach((k) => fd.append(k, form[k] ?? ""));

    // add documents
    Object.keys(doc).forEach((k) => {
      if (doc[k]) fd.append(k, doc[k]);
    });

    await onSubmit(fd);
  };

  return (
    <form onSubmit={submit}>
      {/* BUSINESS INFO */}
      <div className="card-header">
        <h2>Business Details</h2>
        <p className="card-subtitle">Fill all required fields carefully.</p>
      </div>

      <div className="form-grid">
        <Field
          label="Business Name *"
          name="business_name"
          value={form.business_name}
          onChange={handleChange}
          error={errors.business_name}
          placeholder="e.g., Nepal Tech Traders"
        />

        <Select
          label="Business Type *"
          name="business_type"
          value={form.business_type}
          onChange={handleChange}
          error={errors.business_type}
          options={BUSINESS_TYPES}
        />

        <Select
          label="Sector *"
          name="sector"
          value={form.sector}
          onChange={handleChange}
          error={errors.sector}
          options={SECTORS}
        />

        <Field
          label="PAN/VAT No."
          name="pan_vat"
          value={form.pan_vat}
          onChange={handleChange}
          error={errors.pan_vat}
          placeholder="PAN/VAT number"
        />

        <Field
          label="Proposed Capital"
          name="proposed_capital"
          value={form.proposed_capital}
          onChange={handleChange}
          error={errors.proposed_capital}
          placeholder="e.g., 500000"
        />

        <Field
          label="No. of Employees"
          name="employees_count"
          value={form.employees_count}
          onChange={handleChange}
          error={errors.employees_count}
          placeholder="e.g., 10"
        />

        <Field
          label="Business Start Date"
          name="business_start_date"
          value={form.business_start_date}
          onChange={handleChange}
          error={errors.business_start_date}
          type="date"
        />
      </div>

      <Divider title="Business Address" />

      <div className="form-grid">
        <Field label="Province *" name="province" value={form.province} onChange={handleChange} error={errors.province} />
        <Field label="District *" name="district" value={form.district} onChange={handleChange} error={errors.district} />
        <Field label="Municipality *" name="municipality" value={form.municipality} onChange={handleChange} error={errors.municipality} />
        <Field label="Ward No. *" name="ward_no" value={form.ward_no} onChange={handleChange} error={errors.ward_no} placeholder="e.g., 5" />
        <Field label="Street" name="street" value={form.street} onChange={handleChange} error={errors.street} />
        <Field label="House No." name="house_no" value={form.house_no} onChange={handleChange} error={errors.house_no} />
        <Field label="Office Phone" name="office_phone" value={form.office_phone} onChange={handleChange} error={errors.office_phone} placeholder="01xxxxxxx" />
      </div>

      <Divider title="Owner Details" />

      <div className="form-grid">
        <Field label="Full Name *" name="owner_full_name" value={form.owner_full_name} onChange={handleChange} error={errors.owner_full_name} />
        <Field label="Father Name *" name="owner_father_name" value={form.owner_father_name} onChange={handleChange} error={errors.owner_father_name} />
        <Field label="Grandfather Name *" name="owner_grandfather_name" value={form.owner_grandfather_name} onChange={handleChange} error={errors.owner_grandfather_name} />

        <Field label="Citizenship No. *" name="owner_citizenship_no" value={form.owner_citizenship_no} onChange={handleChange} error={errors.owner_citizenship_no} />
        <Field label="Citizenship Issue District *" name="owner_citizenship_issue_district" value={form.owner_citizenship_issue_district} onChange={handleChange} error={errors.owner_citizenship_issue_district} />
        <Field label="Phone *" name="owner_phone" value={form.owner_phone} onChange={handleChange} error={errors.owner_phone} placeholder="+97798XXXXXXXX" />
        <Field label="Email *" name="owner_email" value={form.owner_email} onChange={handleChange} error={errors.owner_email} placeholder="name@email.com" />
      </div>

      <Divider title="Documents" />

      <div className="form-grid">
        <FileField label="Citizenship Front *" name="citizenship_front" onChange={handleFile} error={errors.citizenship_front} />
        <FileField label="Citizenship Back *" name="citizenship_back" onChange={handleFile} error={errors.citizenship_back} />
        <FileField label="PAN / Tax Document" name="tax_pan" onChange={handleFile} error={errors.tax_pan} />
        <FileField label="Registration Letter (if any)" name="registration_letter" onChange={handleFile} error={errors.registration_letter} />
        <FileField label="Other Document" name="other_doc" onChange={handleFile} error={errors.other_doc} />
      </div>

      <div className="actions-row">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}

/* ---------------- Small UI helpers ---------------- */

function Divider({ title }) {
  return (
    <div style={{ margin: "1.1rem 0 0.75rem", borderTop: "1px solid rgba(148,163,184,.18)", paddingTop: "0.9rem" }}>
      <h3 style={{ margin: 0, fontSize: "1rem" }}>{title}</h3>
      <p className="text-muted" style={{ margin: "0.25rem 0 0" }}>
        Fields marked with * are required.
      </p>
    </div>
  );
}

function Field({ label, name, value, onChange, error, placeholder, type = "text" }) {
  return (
    <div>
      <label>
        {label}
        <input name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} />
      </label>
      {error ? <div className="alert alert-error" style={{ marginTop: 6 }}>{error}</div> : null}
    </div>
  );
}

function Select({ label, name, value, onChange, error, options }) {
  return (
    <div>
      <label>
        {label}
        <select name={name} value={value} onChange={onChange}>
          <option value="">-- Select --</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      {error ? <div className="alert alert-error" style={{ marginTop: 6 }}>{error}</div> : null}
    </div>
  );
}

function FileField({ label, name, onChange, error }) {
  return (
    <div>
      <label>
        {label}
        <input name={name} type="file" onChange={onChange} />
      </label>
      {error ? <div className="alert alert-error" style={{ marginTop: 6 }}>{error}</div> : null}
    </div>
  );
}
