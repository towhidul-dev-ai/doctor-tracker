
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
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
import { authClient } from "@/lib/auth-client";

// Doctor type
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

// Patient type
type Patient = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  createdAt?: string;
};

// Component props
type DoctorDetailsClientProps = {
  doctor: Doctor;
  initialPatients: Patient[];
};

// API response type
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DoctorDetailsClient({
  doctor,
  initialPatients,
}: DoctorDetailsClientProps) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [deletingPatientId, setDeletingPatientId] = useState<string | null>(
    null
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Refresh patient list
  async function getPatients() {
    const {data, error} = await authClient.token()
    // console.log(data)
    const token = data?.token
    if (!API_URL) {
      alert("API URL is not configured.");
      return;
    }

    try {
      setPatientsLoading(true);

      const response = await fetch(
        `${API_URL}/api/doctors/${encodeURIComponent(doctor._id)}/patients`,
        { headers: {
          'Content-Type': "application/json",
          authorization: `Bearer ${token}`

        },
          cache: "no-store",
        }
      );

      const result: ApiResponse<Patient[]> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch patients.");
      }

      setPatients(result.data);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to refresh patients."
      );
    } finally {
      setPatientsLoading(false);
    }
  }

  // Add a new patient
  async function handleAddPatient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!API_URL) {
      alert("API URL is not configured.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_URL}/api/doctors/${encodeURIComponent(doctor._id)}/patients`,
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

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
      });

      setShowForm(false);

      // Refresh patient list
      await getPatients();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to add patient."
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

    if (!API_URL) {
      alert("API URL is not configured.");
      return;
    }

    try {
      setDeletingPatientId(patientId);

      const response = await fetch(
        `${API_URL}/api/doctors/${encodeURIComponent(doctor._id)}/patients/${encodeURIComponent(patientId)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete patient.");
      }

      // Refresh patient list
      await getPatients();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete patient."
      );
    } finally {
      setDeletingPatientId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Back button and heading */}
      <div>
        <Link
          href="/dashboard/doctors"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
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
              {doctor.specialization ||
                doctor.specialty ||
                "Specialization not provided"}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={18} className="shrink-0 text-gray-400" />
                <span>{doctor.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={18} className="shrink-0 text-gray-400" />
                <span>{doctor.phone || "Not provided"}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={18} className="shrink-0 text-gray-400" />
                <span>
                  {doctor.hospital ||
                    doctor.address ||
                    "Hospital not provided"}
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

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={getPatients}
              disabled={patientsLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={17}
                className={patientsLoading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={() => setShowForm((previous) => !previous)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Patient
            </button>
          </div>
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
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    phone: event.target.value,
                  }))
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    email: event.target.value,
                  }))
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Save Patient"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
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
                  <th className="px-5 py-4 font-semibold">
                    Patient Name
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Phone
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Email
                  </th>

                  <th className="px-5 py-4 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {patients.map((patient) => (
                  <tr
                    key={patient._id}
                    className="transition hover:bg-gray-50"
                  >
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
                        type="button"
                        onClick={() =>
                          handleDeletePatient(patient._id)
                        }
                        disabled={deletingPatientId === patient._id}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Delete patient"
                      >
                        <Trash2 size={16} />

                        {deletingPatientId === patient._id
                          ? "Deleting..."
                          : "Delete"}
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
