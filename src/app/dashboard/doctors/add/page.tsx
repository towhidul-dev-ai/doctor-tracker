
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddDoctorPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8000/api/doctors", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           specialty,
//           email,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to add doctor");
//       }

//       router.push("/doctors");
//       router.refresh();
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="mx-auto max-w-xl p-6">
//       <h1 className="mb-2 text-2xl font-bold">Add New Doctor</h1>
//       <p className="mb-6 text-gray-500">
//         Enter the doctor's information below.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="mb-2 block font-medium">
//             Doctor Name
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Dr. Sarah Ahmed"
//             required
//             className="w-full rounded-lg border p-3"
//           />
//         </div>

//         <div>
//           <label className="mb-2 block font-medium">
//             Specialty
//           </label>
//           <input
//             type="text"
//             value={specialty}
//             onChange={(e) => setSpecialty(e.target.value)}
//             placeholder="Cardiology"
//             required
//             className="w-full rounded-lg border p-3"
//           />
//         </div>

//         <div>
//           <label className="mb-2 block font-medium">
//             Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="doctor@example.com"
//             required
//             className="w-full rounded-lg border p-3"
//           />
//         </div>

//         {error && (
//           <p className="text-sm text-red-500">{error}</p>
//         )}

//         <div className="flex gap-3">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="rounded-lg border px-5 py-3"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={loading}
//             className="rounded-lg bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
//           >
//             {loading ? "Adding Doctor..." : "Add Doctor"}
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Stethoscope,
  UserRound,
  Mail,
  Phone,
  GraduationCap,
  BriefcaseMedical,
  Wallet,
  MapPin,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const specialties = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "Gynecologist",
  "General Physician",
  "Ophthalmologist",
  "ENT Specialist",
  "Psychiatrist",
  "Urologist",
  "Gastroenterologist",
  "Endocrinologist",
  "Pulmonologist",
  "Oncologist",
  "Nephrologist",
  "Rheumatologist",
];

const initialForm = {
  name: "",
  specialty: "",
  email: "",
  phone: "",
  qualification: "",
  experience: "",
  consultationFee: "",
  address: "",
  image: "",
};

const dummyDoctor = {
  name: "Dr. Sarah Ahmed",
  specialty: "Cardiologist",
  email: "sarah.ahmed@example.com",
  phone: "01712345678",
  qualification: "MBBS, MD (Cardiology)",
  experience: "12",
  consultationFee: "1000",
  address: "Evercare Hospital, Chattogram",
  image: "https://i.pravatar.cc/300?img=47",
};

export default function AddDoctorPage() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const fillDummyData = () => {
    setFormData(dummyDoctor);
    setError("");
    setSuccess("");
  };

  const resetForm = () => {
    setFormData(initialForm);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!API_URL) {
        throw new Error("API URL is not configured. Check your .env.local file.");
      }

      const response = await fetch(`${API_URL}/api/doctors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          experience: Number(formData.experience) || 0,
          consultationFee: Number(formData.consultationFee) || 0,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add doctor");
      }

      setSuccess("Doctor added successfully!");

      setTimeout(() => {
        router.push("/dashboard/doctors");
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-7">
          <Link
            href="/dashboard/doctors"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
          >
            <ArrowLeft size={17} />
            Back to Doctors
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
                  <Stethoscope size={21} />
                </span>
                <span className="text-sm font-semibold text-emerald-700">
                  Doctor Management
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Add New Doctor
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Add a new doctor to your hospital management system.
              </p>
            </div>

            <button
              type="button"
              onClick={fillDummyData}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
            >
              <Sparkles size={17} />
              Fill Dummy Data
            </button>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Card Header */}
            <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
              <h2 className="text-lg font-bold text-slate-900">
                Doctor Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the doctor's personal and professional details.
              </p>
            </div>

            <div className="space-y-8 p-5 sm:p-8">

              {/* Personal Information */}
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <UserRound size={19} className="text-emerald-600" />
                  <h3 className="font-bold text-slate-800">
                    Personal Information
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Doctor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Dr. Sarah Ahmed"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="doctor@example.com"
                        required
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01712345678"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Specialty <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Stethoscope
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                        className={`${inputClass} appearance-none pl-11`}
                      >
                        <option value="">Select specialty</option>
                        {specialties.map((specialty) => (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <div className="border-t border-slate-100" />

              {/* Professional Information */}
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <GraduationCap size={20} className="text-emerald-600" />
                  <h3 className="font-bold text-slate-800">
                    Professional Information
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Qualification</label>
                    <div className="relative">
                      <GraduationCap
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        placeholder="MBBS, MD (Cardiology)"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Years of Experience</label>
                    <div className="relative">
                      <BriefcaseMedical
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="12"
                        min="0"
                        step="1"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Consultation Fee (৳)
                    </label>
                    <div className="relative">
                      <Wallet
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="number"
                        name="consultationFee"
                        value={formData.consultationFee}
                        onChange={handleChange}
                        placeholder="1000"
                        min="0"
                        step="1"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Hospital / Address</label>
                    <div className="relative">
                      <MapPin
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Evercare Hospital, Chattogram"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="border-t border-slate-100" />

              {/* Profile Image */}
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <ImageIcon size={19} className="text-emerald-600" />
                  <h3 className="font-bold text-slate-800">
                    Profile Image
                  </h3>
                </div>

                <label className={labelClass}>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/doctor-image.jpg"
                  className={inputClass}
                />

                <p className="mt-2 text-xs text-slate-400">
                  Enter a publicly accessible image URL. This field is optional.
                </p>

                {formData.image && (
                  <div className="mt-4 flex items-center gap-4 rounded-xl border border-slate-200 p-3">
                    <img
                      src={formData.image}
                      alt="Doctor preview"
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-700">
                        Image Preview
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {formData.image}
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Messages */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle size={19} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              {success && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                  <CheckCircle2 size={19} />
                  {success}
                </div>
              )}

            </div>

            {/* Form Footer */}
            <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-100 bg-slate-50 px-5 py-5 sm:flex-row sm:px-8">
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
              >
                Reset Form
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard/doctors"
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Adding Doctor...
                    </>
                  ) : (
                    <>
                      <Stethoscope size={17} />
                      Add Doctor
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          Doctor Tracker Dashboard · All information is stored securely in your database.
        </p>
      </div>
    </main>
  );
}
