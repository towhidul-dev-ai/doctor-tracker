
import Link from "next/link";
import {
  Stethoscope,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Analytics", href: "/#analytics" },
  { label: "About", href: "/#about" },
];

const featureLinks = [
  { label: "Doctor Management", href: "/#features" },
  { label: "Patient Management", href: "/#features" },
  { label: "Data Analytics", href: "/#analytics" },
  { label: "Secure Access", href: "/#features" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f7faff]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Stethoscope size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Doctor<span className="text-blue-600">Tracker</span>
                </h2>

                <p className="text-[11px] font-medium tracking-wide text-slate-500">
                  Healthcare Management
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              A smarter way to manage doctors, organize patient records,
              and discover meaningful healthcare insights through a
              modern administration platform.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-2 text-xs font-medium text-blue-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Simplifying healthcare administration
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Features
            </h3>

            <ul className="mt-5 space-y-3">
              {featureLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-slate-600 transition hover:text-blue-600"
                  >
                    {link.label}
                    <ArrowUpRight size={13} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Doctor Tracker. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            Built with
            <Heart size={15} className="fill-rose-500 text-rose-500" />
            for better healthcare management.
          </p>
        </div>
      </div>
    </footer>
  );
}
