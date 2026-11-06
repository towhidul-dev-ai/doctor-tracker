
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Menu,
  X,
  Activity,
  LogOut,
  ChevronRight,
  Home,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Doctors",
    href: "/dashboard/doctors",
    icon: Stethoscope,
  },
  {
    name: "Patients",
    href: "/dashboard/patients",
    icon: Users,
  },
];

export default function DashboardLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pageTitle =
    pathname === "/dashboard"
      ? "Admin Dashboard"
      : pathname.startsWith("/dashboard/doctors")
        ? "Doctors"
        : pathname.startsWith("/dashboard/patients")
          ? "Patients"
          : "Admin Portal";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Activity size={24} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Doctor Tracker
              </h1>
              <p className="text-xs text-slate-500">Admin Portal</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  </div>

                  {isActive && <ChevronRight size={16} />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Account Footer */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
              A
            </div> */}

            <div className="min-w-0 flex-1">
              {/* <p className="truncate text-sm font-semibold text-slate-800">
                Administrator
              </p> */}
              <p className="text-xs text-slate-500">Admin Account</p>
            </div>

            <button
              type="button"
              aria-label="Logout"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <div className="min-h-screen lg:pl-72">
        {/* Dashboard Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
          {/* Header Left */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-sm text-slate-500">Doctor Tracker</p>
              <h2 className="text-lg font-semibold text-slate-900">
                {pageTitle}
              </h2>
            </div>
          </div>

          {/* Header Right */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-4"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Link>

            {/* Admin Profile */}
            <div className="hidden items-center gap-3 sm:flex">
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                A
              </div> */}

              <div>
                {/* <p className="text-sm font-semibold text-slate-800">
                  Administrator
                </p> */}
                {/* <p className="text-xs text-slate-500">Admin</p> */}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-5rem)] p-5 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
