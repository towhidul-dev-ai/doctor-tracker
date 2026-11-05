
// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   Search,
//   Users,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
//   UserRound,
// } from "lucide-react";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface Patient {
//   _id: string;
//   name: string;
//   phone: string;
//   email: string;
//   age?: number;
//   gender?: string;
//   condition?: string;
//   doctorId: string;
//   createdAt: string;
//   doctor?: {
//     _id: string;
//     name: string;
//     specialty: string;
//   };
// }

// interface PatientResponse {
//   success: boolean;
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
//   data: Patient[];
// }

// export default function PatientsPage() {
//   const [patients, setPatients] = useState<Patient[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");
//   const [gender, setGender] = useState("");
//   const [condition, setCondition] = useState("");

//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   const limit = 6;

//   const fetchPatients = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const params = new URLSearchParams({
//         page: String(page),
//         limit: String(limit),
//       });

//       if (search.trim()) params.set("search", search.trim());
//       if (gender) params.set("gender", gender);
//       if (condition) params.set("condition", condition);

//       const response = await fetch(
//         `${API_URL}/api/patients?${params.toString()}`
//       );

//       const result: PatientResponse = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error("Failed to fetch patients");
//       }

//       setPatients(result.data || []);
//       setTotal(result.total || 0);
//       setTotalPages(result.totalPages || 1);
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong while loading patients."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [page, search, gender, condition]);

//   useEffect(() => {
//     fetchPatients();
//   }, [fetchPatients]);

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//     setPage(1);
//   };

//   const handleGenderChange = (value: string) => {
//     setGender(value);
//     setPage(1);
//   };

//   const handleConditionChange = (value: string) => {
//     setCondition(value);
//     setPage(1);
//   };

//   const formatDate = (date: string) => {
//     if (!date) return "—";

//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="mx-auto max-w-7xl space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">
//             Manage Patients
//           </h1>
//           <p className="mt-2 text-slate-500">
//             Manage patient records and their doctor relationships.
//           </p>
//         </div>

//         <button
//           onClick={fetchPatients}
//           disabled={loading}
//           className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
//         >
//           <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
//           Refresh
//         </button>
//       </div>

//       {/* Statistics */}
//       <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
//         <div className="flex items-center gap-4">
//           <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
//             <Users size={25} />
//           </div>

//           <div>
//             <p className="text-sm font-medium text-slate-500">
//               Total Patients
//             </p>
//             <h2 className="text-2xl font-bold text-slate-900">
//               {total}
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//           <div className="relative">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//             />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) => handleSearchChange(e.target.value)}
//               placeholder="Search patients..."
//               className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//             />
//           </div>

//           <select
//             value={gender}
//             onChange={(e) => handleGenderChange(e.target.value)}
//             className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500"
//           >
//             <option value="">All Genders</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//             <option value="Prefer not to say">Prefer not to say</option>
//           </select>

//           <select
//             value={condition}
//             onChange={(e) => handleConditionChange(e.target.value)}
//             className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500"
//           >
//             <option value="">All Conditions</option>
//             <option value="Diabetes">Diabetes</option>
//             <option value="Hypertension">Hypertension</option>
//             <option value="Heart Disease">Heart Disease</option>
//             <option value="Asthma">Asthma</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//       </div>

//       {/* Patient Table */}
//       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//         <div className="border-b border-slate-100 px-6 py-5">
//           <h2 className="font-semibold text-slate-900">
//             Patient Records
//           </h2>
//           <p className="mt-1 text-sm text-slate-500">
//             Showing {patients.length} of {total} patients
//           </p>
//         </div>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
//             <p className="mt-4 text-sm text-slate-500">
//               Loading patients...
//             </p>
//           </div>
//         ) : error ? (
//           <div className="px-6 py-16 text-center">
//             <p className="font-medium text-red-600">{error}</p>
//             <button
//               onClick={fetchPatients}
//               className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : patients.length === 0 ? (
//           <div className="px-6 py-16 text-center">
//             <UserRound className="mx-auto text-slate-300" size={40} />
//             <h3 className="mt-3 font-semibold text-slate-800">
//               No patients found
//             </h3>
//             <p className="mt-1 text-sm text-slate-500">
//               Try changing your search or filters.
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[950px] text-left">
//               <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
//                 <tr>
//                   <th className="px-6 py-4 font-semibold">Patient</th>
//                   <th className="px-6 py-4 font-semibold">Age / Gender</th>
//                   <th className="px-6 py-4 font-semibold">Condition</th>
//                   <th className="px-6 py-4 font-semibold">Assigned Doctor</th>
//                   <th className="px-6 py-4 font-semibold">Added Date</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">
//                 {patients.map((patient) => (
//                   <tr
//                     key={patient._id}
//                     className="transition hover:bg-slate-50"
//                   >
//                     <td className="px-6 py-4">
//                       <p className="font-semibold text-slate-800">
//                         {patient.name}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500">
//                         {patient.email}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500">
//                         {patient.phone}
//                       </p>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-slate-600">
//                       {patient.age ?? "—"} / {patient.gender || "—"}
//                     </td>

//                     <td className="px-6 py-4">
//                       <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
//                         {patient.condition || "Not specified"}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4">
//                       <p className="text-sm font-medium text-slate-800">
//                         {patient.doctor?.name || "Unknown doctor"}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500">
//                         {patient.doctor?.specialty || "—"}
//                       </p>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-slate-500">
//                       {formatDate(patient.createdAt)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         {!loading && !error && patients.length > 0 && (
//           <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row">
//             <p className="text-sm text-slate-500">
//               Page {page} of {totalPages}
//             </p>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setPage((current) => Math.max(1, current - 1))}
//                 disabled={page <= 1}
//                 className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 <ChevronLeft size={16} />
//                 Previous
//               </button>

//               <button
//                 onClick={() =>
//                   setPage((current) => Math.min(totalPages, current + 1))
//                 }
//                 disabled={page >= totalPages}
//                 className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 Next
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Search,
  Users,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  UserRound,
} from "lucide-react";
import EditPatientDialog from "./EditPaitentDialog";
import DeletePatientDialog from "./DeletePatientDialog";

// import EditPatientDialog from "@/components/patients/EditPatientDialog";
// import DeletePatientDialog from "@/components/patients/DeletePatientDialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Patient {
  _id: string;
  name: string;
  phone: string;
  email: string;
  age?: number;
  gender?: string;
  condition?: string;
  doctorId: string;
  createdAt: string;
  updatedAt?: string;
  doctor?: {
    _id: string;
    name: string;
    specialty: string;
  };
}

interface PatientResponse {
  success: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Patient[];
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filters
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [condition, setCondition] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6;

  // Fetch patients
  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (gender) {
        params.set("gender", gender);
      }

      if (condition) {
        params.set("condition", condition);
      }

      const response = await fetch(
        `${API_URL}/api/patients?${params.toString()}`
      );

      const result: PatientResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Failed to fetch patients.");
      }

      setPatients(result.data || []);
      setTotal(result.total || 0);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading patients."
      );
    } finally {
      setLoading(false);
    }
  }, [page, search, gender, condition]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Search handler
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // Gender filter
  const handleGenderChange = (value: string) => {
    setGender(value);
    setPage(1);
  };

  // Condition filter
  const handleConditionChange = (value: string) => {
    setCondition(value);
    setPage(1);
  };

  // Format date
  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manage Patients
          </h1>

          <p className="mt-2 text-slate-500">
            Manage patient records and their doctor relationships.
          </p>
        </div>

        <button
          onClick={fetchPatients}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Total Patients */}
      <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <Users size={25} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Patients
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              {total}
            </h2>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name, phone, email..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Gender Filter */}
          <select
            value={gender}
            onChange={(e) => handleGenderChange(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">
              Prefer not to say
            </option>
          </select>

          {/* Condition Filter */}
          <select
            value={condition}
            onChange={(e) => handleConditionChange(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="">All Conditions</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Heart Disease">Heart Disease</option>
            <option value="Asthma">Asthma</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Patient Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Table Header */}
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="font-semibold text-slate-900">
            Patient Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Showing {patients.length} of {total} patients
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading patients...
            </p>
          </div>

        ) : error ? (
          /* Error */
          <div className="px-6 py-16 text-center">
            <p className="font-medium text-red-600">
              {error}
            </p>

            <button
              onClick={fetchPatients}
              className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Try Again
            </button>
          </div>

        ) : patients.length === 0 ? (
          /* Empty State */
          <div className="px-6 py-16 text-center">
            <UserRound
              className="mx-auto text-slate-300"
              size={40}
            />

            <h3 className="mt-3 font-semibold text-slate-800">
              No patients found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>

        ) : (
          /* Patient Records */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">

              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Patient
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Age / Gender
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Condition
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Assigned Doctor
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Added Date
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {patients.map((patient) => (
                  <tr
                    key={patient._id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Patient Information */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">
                        {patient.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {patient.email}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {patient.phone}
                      </p>
                    </td>

                    {/* Age and Gender */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {patient.age ?? "—"} / {patient.gender || "—"}
                    </td>

                    {/* Condition */}
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        {patient.condition || "Not specified"}
                      </span>
                    </td>

                    {/* Assigned Doctor */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-800">
                        {patient.doctor?.name || "Unknown doctor"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {patient.doctor?.specialty || "—"}
                      </p>
                    </td>

                    {/* Added Date */}
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDate(patient.createdAt)}
                    </td>

                    {/* Edit and Delete Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <EditPatientDialog
                          patient={patient}
                          onUpdated={fetchPatients}
                        />

                        <DeletePatientDialog
                          patient={patient}
                          onDeleted={fetchPatients}
                        />
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && patients.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row">

            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">

              <button
                onClick={() =>
                  setPage((current) => Math.max(1, current - 1))
                }
                disabled={page <= 1}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <button
                onClick={() =>
                  setPage((current) =>
                    Math.min(totalPages, current + 1)
                  )
                }
                disabled={page >= totalPages}
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={16} />
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
