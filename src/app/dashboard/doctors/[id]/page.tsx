
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Stethoscope,
  Mail,
  Phone,
  MapPin,
  Plus,
  Trash2,
  Users,
  RefreshCw,
} from "lucide-react";

type Doctor = {
  _id: string;
  name: string;
  specialty?: string;
  specialization?: string;
  hospital?: string;
  address?: string;
  email: string;
  phone?: string;
};

type Patient = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  createdAt?: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DoctorDetailsPage() {
  const params = useParams();
  const doctorId = params.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [loading, setLoading] = useState(true);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Fetch doctor information
  async function getDoctor() {
    try {
      setLoading(true);
      setError("");

      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(
        `${API_URL}/api/doctors/${doctorId}`
      );

      const result: ApiResponse<Doctor> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch doctor.");
      }

      setDoctor(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  // Fetch patients belonging to this doctor
  async function getPatients() {
    try {
      setPatientsLoading(true);

      const response = await fetch(
        `${API_URL}/api/doctors/${doctorId}/patients`
      );

      const result: ApiResponse<Patient[]> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch patients.");
      }

      setPatients(result.data);
    } catch (err) {
      console.error("Patient fetching error:", err);
    } finally {
      setPatientsLoading(false);
    }
  }

  useEffect(() => {
    if (doctorId) {
      getDoctor();
      getPatients();
    }
  }, [doctorId]);

  // Add a new patient
  async function handleAddPatient(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_URL}/api/doctors/${doctorId}/patients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add patient.");
      }

      setFormData({
        name: "",
        phone: "",
        email: "",
      });

      setShowForm(false);
      await getPatients();

    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to add patient."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Delete a patient
  async function handleDeletePatient(patientId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/api/doctors/${doctorId}/patients/${patientId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete patient.");
      }

      await getPatients();

    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to delete patient."
      );
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <RefreshCw className="animate-spin text-blue-600" size={30} />
      </div>
    );
  }

  // Error state
  if (error || !doctor) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-semibold text-red-600">
          {error || "Doctor not found."}
        </p>

        <Link
          href="/dashboard/doctors"
          className="mt-4 inline-block text-sm font-semibold text-blue-600"
        >
          Back to Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Back button and heading */}
      <div>
        <Link
          href="/dashboard/doctors"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Doctors
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Doctor Details
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View doctor information and manage their patients.
        </p>
      </div>

      {/* Doctor Profile */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Stethoscope size={32} />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              {doctor.name}
            </h2>

            <p className="mt-1 font-medium text-blue-600">
              {doctor.specialization || doctor.specialty || "Specialization not provided"}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={18} className="text-gray-400" />
                <span>{doctor.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={18} className="text-gray-400" />
                <span>{doctor.phone || "Not provided"}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={18} className="text-gray-400" />
                <span>
                  {doctor.hospital || doctor.address || "Hospital not provided"}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Patient Management */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Patient Header */}
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <Users size={21} className="text-blue-600" />

              <h2 className="text-lg font-bold text-gray-900">
                Patients
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {patients.length} registered patients
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Patient
          </button>
        </div>

        {/* Add Patient Form */}
        {showForm && (
          <form
            onSubmit={handleAddPatient}
            className="space-y-4 border-b border-gray-100 bg-gray-50 p-5"
          >
            <h3 className="font-semibold text-gray-900">
              Add New Patient
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <input
                type="text"
                placeholder="Patient Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Save Patient"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Patient List */}
        {patientsLoading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading patients...
          </div>
        ) : patients.length === 0 ? (
          <div className="p-10 text-center">
            <Users size={35} className="mx-auto text-gray-300" />

            <h3 className="mt-3 font-semibold text-gray-800">
              No patients found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add a patient to this doctor's list.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">Patient Name</th>
                  <th className="px-5 py-4 font-semibold">Phone</th>
                  <th className="px-5 py-4 font-semibold">Email</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-50">

                    <td className="px-5 py-4 font-medium text-gray-900">
                      {patient.name}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {patient.phone}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {patient.email}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDeletePatient(patient._id)}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-red-600 transition hover:bg-red-50"
                        title="Delete patient"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
