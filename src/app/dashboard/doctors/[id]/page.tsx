

import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import DoctorDetailsClient from "./DoctorDetailsClient";

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

const API_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL;

async function getDoctor(id: string): Promise<Doctor | null> {
  if (!API_URL) {
    throw new Error("Backend URL is not configured.");
  }

  const response = await fetch(
    `${API_URL}/api/doctors/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch doctor. Status: ${response.status}`
    );
  }

  const result: ApiResponse<Doctor> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch doctor.");
  }

  return result.data;
}

async function getPatients(id: string): Promise<Patient[]> {
  if (!API_URL) {
    throw new Error("Backend URL is not configured.");
  }

  const response = await fetch(
    `${API_URL}/api/doctors/${encodeURIComponent(id)}/patients`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch patients. Status: ${response.status}`
    );
  }

  const result: ApiResponse<Patient[]> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch patients.");
  }

  return result.data;
}

// This component performs request-time work.
// It must be rendered inside Suspense.
async function DoctorDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();

  const { id } = await params;

  try {
    const doctor = await getDoctor(id);

    if (!doctor) {
      return (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Doctor not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The doctor you are looking for does not exist.
          </p>

          <Link
            href="/dashboard/doctors"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Back to Doctors
          </Link>
        </div>
      );
    }

    const patients = await getPatients(id);

    return (
      <DoctorDetailsClient
        doctor={doctor}
        initialPatients={patients}
      />
    );
  } catch (error) {
    console.error("Doctor details error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to load doctor details.";

    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Failed to load doctor details
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {message}
        </p>

        <Link
          href="/dashboard/doctors"
          className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Back to Doctors
        </Link>
      </div>
    );
  }
}

// Page itself remains synchronous.
// Request-time content is placed inside Suspense.
export default function DoctorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-sm font-medium text-gray-500">
            Loading doctor details...
          </p>
        </div>
      }
    >
      <DoctorDetailsContent params={params} />
    </Suspense>
  );
}
