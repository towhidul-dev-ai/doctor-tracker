
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   Stethoscope,
//   Plus,
//   Search,
//   Mail,
//   RefreshCw,
//   Phone,
//   MapPin,
//   GraduationCap,
//   BriefcaseBusiness,
//   Wallet,
// } from "lucide-react";

// type Doctor = {
//   _id: string;
//   name: string;
//   specialty: string;
//   email: string;
//   phone?: string;
//   qualification?: string;
//   experience?: number;
//   consultationFee?: number;
//   address?: string;
//   image?: string;
//   createdAt?: string;
// };

// type DoctorsResponse = {
//   success: boolean;
//   total: number;
//   data: Doctor[];
// };

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// export default function DoctorsPage() {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch all doctors
//   async function getDoctors() {
//     try {
//       setLoading(true);
//       setErrorMessage("");

//       if (!apiUrl) {
//         throw new Error("NEXT_PUBLIC_API_URL is not configured.");
//       }

//       const response = await fetch(`${apiUrl}/api/doctors`);

//       if (!response.ok) {
//         throw new Error(`Failed to fetch doctors: ${response.status}`);
//       }

//       const result: DoctorsResponse = await response.json();

//       if (!result.success || !Array.isArray(result.data)) {
//         throw new Error("Invalid response received from the server.");
//       }

//       setDoctors(result.data);
//     } catch (error) {
//       setErrorMessage(
//         error instanceof Error
//           ? error.message
//           : "Something went wrong while loading doctors."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getDoctors();
//   }, []);

//   // Search doctors
//   const filteredDoctors = doctors.filter((doctor) => {
//     const search = searchTerm.toLowerCase();

//     return (
//       doctor.name?.toLowerCase().includes(search) ||
//       doctor.specialty?.toLowerCase().includes(search) ||
//       doctor.email?.toLowerCase().includes(search) ||
//       doctor.qualification?.toLowerCase().includes(search) ||
//       doctor.address?.toLowerCase().includes(search)
//     );
//   });

//   return (
//     <div className="space-y-6">

//       {/* Page heading */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <Stethoscope size={16} />
//             <span>Dashboard</span>
//             <span>/</span>
//             <span className="text-gray-900">Doctors</span>
//           </div>

//           <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
//             All Doctors
//           </h1>

//           <p className="mt-1 text-sm text-gray-500">
//             Manage and view all registered doctors.
//           </p>
//         </div>

//         <Link
//           href="/dashboard/doctors/add"
//           className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
//         >
//           <Plus size={18} />
//           Add Doctor
//         </Link>
//       </div>

//       {/* Summary card */}
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
//         <div className="flex items-center gap-4">
//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//             <Stethoscope size={24} />
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">Total Doctors</p>
//             <p className="text-2xl font-bold text-gray-900">
//               {loading ? "..." : doctors.length}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Search and Refresh */}
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//         <div className="relative w-full sm:max-w-md">
//           <Search
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(event) => setSearchTerm(event.target.value)}
//             placeholder="Search by name, specialty, email..."
//             className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>

//         <button
//           type="button"
//           onClick={getDoctors}
//           disabled={loading}
//           className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
//         >
//           <RefreshCw
//             size={16}
//             className={loading ? "animate-spin" : ""}
//           />
//           Refresh
//         </button>
//       </div>

//       {/* Loading */}
//       {loading && (
//         <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
//           <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
//           <p className="mt-4 text-sm text-gray-500">
//             Loading doctors...
//           </p>
//         </div>
//       )}

//       {/* Error */}
//       {!loading && errorMessage && (
//         <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
//           <p className="font-semibold text-red-700">
//             Could not load doctors
//           </p>

//           <p className="mt-2 text-sm text-red-600">
//             {errorMessage}
//           </p>

//           <button
//             type="button"
//             onClick={getDoctors}
//             className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
//           >
//             Try Again
//           </button>
//         </div>
//       )}

//       {/* Empty state */}
//       {!loading && !errorMessage && filteredDoctors.length === 0 && (
//         <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
//           <Stethoscope
//             size={32}
//             className="mx-auto text-gray-400"
//           />

//           <h2 className="mt-4 text-lg font-semibold text-gray-900">
//             {searchTerm ? "No doctors found" : "No doctors yet"}
//           </h2>

//           <p className="mt-2 text-sm text-gray-500">
//             {searchTerm
//               ? "Try another search term."
//               : "Add your first doctor to get started."}
//           </p>

//           {!searchTerm && (
//             <Link
//               href="/dashboard/doctors/add"
//               className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
//             >
//               <Plus size={18} />
//               Add Doctor
//             </Link>
//           )}
//         </div>
//       )}

//       {/* Doctors Grid */}
//       {!loading && !errorMessage && filteredDoctors.length > 0 && (
//         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

//           {filteredDoctors.map((doctor) => (
//             <div
//               key={doctor._id}
//               className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//             >

//               {/* Doctor Header */}
//               <div className="flex items-start gap-4">
//                 {doctor.image ? (
//                   <img
//                     src={doctor.image}
//                     alt={doctor.name}
//                     className="h-14 w-14 shrink-0 rounded-xl object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                     <Stethoscope size={26} />
//                   </div>
//                 )}

//                 <div className="min-w-0">
//                   <h2 className="font-semibold text-gray-900">
//                     {doctor.name}
//                   </h2>

//                   <p className="mt-1 text-sm font-medium text-blue-600">
//                     {doctor.specialty}
//                   </p>
//                 </div>
//               </div>

//               {/* Doctor Information */}
//               <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">

//                 <div className="flex items-start gap-2 text-sm text-gray-600">
//                   <Mail size={16} className="mt-0.5 shrink-0 text-gray-400" />
//                   <span className="break-all">{doctor.email}</span>
//                 </div>

//                 {doctor.phone && (
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Phone size={16} className="shrink-0 text-gray-400" />
//                     <span>{doctor.phone}</span>
//                   </div>
//                 )}

//                 {doctor.qualification && (
//                   <div className="flex items-start gap-2 text-sm text-gray-600">
//                     <GraduationCap size={16} className="mt-0.5 shrink-0 text-gray-400" />
//                     <span>{doctor.qualification}</span>
//                   </div>
//                 )}

//                 {doctor.address && (
//                   <div className="flex items-start gap-2 text-sm text-gray-600">
//                     <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
//                     <span>{doctor.address}</span>
//                   </div>
//                 )}

//                 <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <BriefcaseBusiness size={16} className="text-gray-400" />
//                     <span>{doctor.experience ?? 0} years experience</span>
//                   </div>

//                   <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
//                     <Wallet size={15} />
//                     ৳{(doctor.consultationFee ?? 0).toLocaleString("en-BD")}
//                   </div>
//                 </div>

//               </div>

//               {/* View Details */}
//               <div className="mt-5 flex justify-end">
//                 <Link
//                   href={`/dashboard/doctors/${doctor._id}`}
//                   className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
//                 >
//                   View Details →
//                 </Link>
//               </div>

//             </div>
//           ))}

//         </div>
//       )}

//     </div>
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
  Phone,
  MapPin,
  GraduationCap,
  BriefcaseBusiness,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

// Doctor type
type Doctor = {
  _id: string;
  name: string;
  specialty?: string;
  specialization?: string;
  hospital?: string;
  email: string;
  phone?: string;
  qualification?: string;
  experience?: number;
  consultationFee?: number;
  address?: string;
  image?: string;
  createdAt?: string;
};

// API response type
type DoctorsResponse = {
  success: boolean;
  total: number;
  data: Doctor[];
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const ITEMS_PER_PAGE = 6;

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all doctors
  async function getDoctors() {
    const {data, error} = await authClient.token()
    const token = data?.token
    try {
      setLoading(true);
      setErrorMessage("");

      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured.");
      }

      const response = await fetch(`${apiUrl}/api/doctors`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch doctors: ${response.status}`);
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

  // Get unique specializations
  const specialties = Array.from(
    new Set(
      doctors
        .map((doctor) => doctor.specialization || doctor.specialty)
        .filter((value): value is string => Boolean(value))
    )
  ).sort();

  // Get unique hospitals
  const hospitals = Array.from(
    new Set(
      doctors
        .map((doctor) => doctor.hospital || doctor.address)
        .filter((value): value is string => Boolean(value))
    )
  ).sort();

  // Convert a date to YYYY-MM-DD
  function getDateValue(dateString?: string) {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Apply search and filters
  const filteredDoctors = doctors.filter((doctor) => {
    const search = searchTerm.toLowerCase().trim();

    const specialty = doctor.specialization || doctor.specialty || "";
    const hospital = doctor.hospital || doctor.address || "";

    const matchesSearch =
      doctor.name?.toLowerCase().includes(search) ||
      specialty.toLowerCase().includes(search) ||
      doctor.email?.toLowerCase().includes(search) ||
      doctor.qualification?.toLowerCase().includes(search) ||
      hospital.toLowerCase().includes(search);

    const matchesSpecialty =
      !selectedSpecialty || specialty === selectedSpecialty;

    const matchesHospital =
      !selectedHospital || hospital === selectedHospital;

    const registrationDate = getDateValue(doctor.createdAt);

    const matchesStartDate =
      !startDate ||
      (registrationDate !== "" && registrationDate >= startDate);

    const matchesEndDate =
      !endDate ||
      (registrationDate !== "" && registrationDate <= endDate);

    return (
      matchesSearch &&
      matchesSpecialty &&
      matchesHospital &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredDoctors.length / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedSpecialty,
    selectedHospital,
    startDate,
    endDate,
  ]);

  // Reset all filters
  function resetFilters() {
    setSearchTerm("");
    setSelectedSpecialty("");
    setSelectedHospital("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedSpecialty !== "" ||
    selectedHospital !== "" ||
    startDate !== "" ||
    endDate !== "";

  return (
    <div className="space-y-6">

      {/* Page Heading */}
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

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Stethoscope size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Doctors
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {loading ? "..." : doctors.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <UsersIcon />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Matching Doctors
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {loading ? "..." : filteredDoctors.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={19} className="text-blue-600" />

            <h2 className="font-semibold text-gray-900">
              Search and Filters
            </h2>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
            >
              <X size={15} />
              Clear filters
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name, specialization, email, hospital..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Filter Controls */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Specialization Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Specialization
            </label>

            <select
              value={selectedSpecialty}
              onChange={(event) =>
                setSelectedSpecialty(event.target.value)
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">All Specializations</option>

              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Hospital
            </label>

            <select
              value={selectedHospital}
              onChange={(event) =>
                setSelectedHospital(event.target.value)
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">All Hospitals</option>

              {hospitals.map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Registered From
            </label>

            <input
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(event) => setStartDate(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Registered To
            </label>

            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => setEndDate(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Refresh */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={getDoctors}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh Doctors
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading doctors...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">
            Could not load doctors
          </p>

          <p className="mt-2 text-sm text-red-600">
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={getDoctors}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !errorMessage && filteredDoctors.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <Stethoscope
            size={32}
            className="mx-auto text-gray-400"
          />

          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            {hasActiveFilters
              ? "No matching doctors found"
              : "No doctors yet"}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {hasActiveFilters
              ? "Try changing your search or filters."
              : "Add your first doctor to get started."}
          </p>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Clear Filters
            </button>
          ) : (
            <Link
              href="/dashboard/doctors/add"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              <Plus size={18} />
              Add Doctor
            </Link>
          )}
        </div>
      )}

      {/* Doctors Grid */}
      {!loading && !errorMessage && paginatedDoctors.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {startIndex + 1}-
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  filteredDoctors.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {filteredDoctors.length}
              </span>{" "}
              doctors
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {paginatedDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Doctor Header */}
                <div className="flex items-start gap-4">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-14 w-14 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Stethoscope size={26} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h2 className="font-semibold text-gray-900">
                      {doctor.name}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-blue-600">
                      {doctor.specialization ||
                        doctor.specialty ||
                        "Specialization not provided"}
                    </p>
                  </div>
                </div>

                {/* Doctor Information */}
                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">

                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Mail
                      size={16}
                      className="mt-0.5 shrink-0 text-gray-400"
                    />
                    <span className="break-all">
                      {doctor.email}
                    </span>
                  </div>

                  {doctor.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone
                        size={16}
                        className="shrink-0 text-gray-400"
                      />
                      <span>{doctor.phone}</span>
                    </div>
                  )}

                  {doctor.qualification && (
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <GraduationCap
                        size={16}
                        className="mt-0.5 shrink-0 text-gray-400"
                      />
                      <span>{doctor.qualification}</span>
                    </div>
                  )}

                  {(doctor.hospital || doctor.address) && (
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0 text-gray-400"
                      />
                      <span>
                        {doctor.hospital || doctor.address}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BriefcaseBusiness
                        size={16}
                        className="text-gray-400"
                      />
                      <span>
                        {doctor.experience ?? 0} years experience
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <Wallet size={15} />
                      ৳
                      {(doctor.consultationFee ?? 0).toLocaleString(
                        "en-BD"
                      )}
                    </div>
                  </div>
                </div>

                {/* View Details */}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row">
              <p className="text-sm text-gray-500">
                Page{" "}
                <span className="font-semibold text-gray-900">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((previous) =>
                      Math.max(previous - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((previous) =>
                      Math.min(previous + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Small icon component for the summary card
function UsersIcon() {
  return <Stethoscope size={24} />;
}



