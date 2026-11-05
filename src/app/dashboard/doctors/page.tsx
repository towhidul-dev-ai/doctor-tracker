
// type Doctor = {
//   _id: string;
//   name: string;
//   specialty: string;
//   email: string;
// };

// type DoctorsResponse = {
//   success: boolean;
//   data: Doctor[];
// };

// async function getDoctors(): Promise<Doctor[]> {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   if (!apiUrl) {
//     throw new Error('NEXT_PUBLIC_API_URL is not configured');
//   }

//   const response = await fetch(`${apiUrl}/doctors`, {
//     cache: 'no-store',
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch doctors');
//   }

//   const result: DoctorsResponse = await response.json();

//   return result.data;
// }

// export default async function DoctorsPage() {
//   const doctors = await getDoctors();

//   return (
//     <main className="min-h-screen bg-gray-50 px-6 py-10">
//       <div className="mx-auto max-w-7xl">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             All Doctors
//           </h1>

//           <p className="mt-2 text-gray-600">
//             View and manage all registered doctors.
//           </p>
//         </div>

//         {/* Doctor Count */}
//         <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
//           <p className="text-sm text-gray-500">
//             Total Doctors
//           </p>

//           <p className="mt-1 text-2xl font-bold text-gray-900">
//             {doctors.length}
//           </p>
//         </div>

//         {/* Doctors List */}
//         {doctors.length === 0 ? (
//           <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
//             <h2 className="text-lg font-semibold text-gray-800">
//               No doctors found
//             </h2>

//             <p className="mt-2 text-sm text-gray-500">
//               Doctors will appear here once they are added.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {doctors.map((doctor) => (
//               <div
//                 key={doctor._id}
//                 className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
//               >
//                 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
//                   {doctor.name?.charAt(0).toUpperCase() || 'D'}
//                 </div>

//                 <h2 className="text-xl font-semibold text-gray-900">
//                   {doctor.name}
//                 </h2>

//                 <p className="mt-1 text-sm font-medium text-blue-600">
//                   {doctor.specialty}
//                 </p>

//                 <p className="mt-3 break-words text-sm text-gray-500">
//                   {doctor.email}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Plus,
  Search,
  Mail,
  RefreshCw,
} from "lucide-react";

type Doctor = {
  _id: string;
  name: string;
  specialty: string;
  email: string;
};

type DoctorsResponse = {
  success: boolean;
  data: Doctor[];
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  async function getDoctors() {
    try {
      setLoading(true);
      setErrorMessage("");

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured. Check your .env.local file."
        );
      }

      const response = await fetch(`${apiUrl}/doctors`);

      if (!response.ok) {
        throw new Error(`Failed to fetch doctors. Status: ${response.status}`);
      }

      const result: DoctorsResponse = await response.json();

      if (!result.success || !Array.isArray(result.data)) {
        throw new Error("Invalid response received from the server.");
      }

      setDoctors(result.data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while loading doctors."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const search = searchTerm.toLowerCase();

    return (
      doctor.name.toLowerCase().includes(search) ||
      doctor.specialty.toLowerCase().includes(search) ||
      doctor.email.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Stethoscope size={16} />
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-gray-900">Doctors</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            All Doctors
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and view all registered doctors.
          </p>
        </div>

        <Link
          href="/dashboard/doctors/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Doctor
        </Link>
      </div>

      {/* Summary card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Stethoscope size={24} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Doctors</p>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "..." : doctors.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name, specialty, or email..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="button"
          onClick={getDoctors}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <p className="mt-4 text-sm text-gray-500">Loading doctors...</p>
        </div>
      )}

      {/* Error state */}
      {!loading && errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">
            Could not load doctors
          </p>

          <p className="mt-2 text-sm text-red-600">{errorMessage}</p>

          <button
            type="button"
            onClick={getDoctors}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !errorMessage && filteredDoctors.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <Stethoscope size={26} />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            {searchTerm ? "No doctors found" : "No doctors yet"}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {searchTerm
              ? "Try searching with a different name, specialty, or email."
              : "Add your first doctor to get started."}
          </p>

          {!searchTerm && (
            <Link
              href="/dashboard/doctors/add"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Doctor
            </Link>
          )}
        </div>
      )}

      {/* Doctors list */}
      {!loading && !errorMessage && filteredDoctors.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Stethoscope size={24} />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate font-semibold text-gray-900">
                    {doctor.name}
                  </h2>

                  <p className="mt-1 text-sm text-blue-600">
                    {doctor.specialty}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail size={16} className="shrink-0" />
                  <span className="truncate">{doctor.email}</span>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <Link
                  href={`/dashboard/doctors/${doctor._id}`}
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}