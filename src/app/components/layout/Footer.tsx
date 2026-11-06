
import Link from "next/link";
import {
  Stethoscope,
  ArrowUpRight,
  Heart,
  ShieldCheck,
  LayoutDashboard,
  Mail,
  MapPin,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Dashboard", href: "/dashboard" },
];

const featureLinks = [
  { label: "Doctor Management", href: "/dashboard/doctors" },
  { label: "Patient Management", href: "/dashboard/patients" },
  { label: "Data Analytics", href: "/dashboard" },
  { label: "Secure Access", href: "/login" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Main Footer */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:-translate-y-1">
                <Stethoscope size={25} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                  Doctor<span className="text-blue-600">Tracker</span>
                </h2>
                <p className="text-xs font-medium tracking-wide text-slate-500">
                  HEALTHCARE MANAGEMENT SYSTEM
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
              A smarter way to manage doctors, organize patient
              information, and monitor healthcare operations.
              Everything you need for a more organized
              healthcare management experience.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                Smarter Healthcare Administration
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wide text-slate-900">
              QUICK LINKS
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h3 className="text-sm font-bold tracking-wide text-slate-900">
              PLATFORM
            </h3>

            <ul className="mt-6 space-y-4">
              {featureLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Information */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ShieldCheck size={21} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Organized Healthcare Management
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Designed for efficient doctor and patient administration.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
          >
            Go to Dashboard
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 py-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-center text-sm text-slate-500 sm:text-left">
            © 2026 Doctor Tracker. All rights reserved.
          </p>

          <p className="flex items-center justify-center gap-1.5 text-sm text-slate-500">
            Crafted with
            <Heart size={15} className="fill-rose-500 text-rose-500" />
            for better healthcare management.
          </p>
        </div>
      </div>
    </footer>
  );
}
