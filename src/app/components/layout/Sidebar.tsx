
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Settings,
  Activity,
  X,
  HeartPulse,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Doctors",
    href: "/doctors",
    icon: Stethoscope,
  },
  {
    name: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <HeartPulse size={23} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                Doctor<span className="text-blue-600">Tracker</span>
              </h1>

              <p className="text-xs text-slate-500">
                Healthcare Management
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={19} />

                  <span>{item.name}</span>

                  {isActive && (
                    <ChevronRight
                      size={16}
                      className="ml-auto"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* System Status */}
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Activity size={18} />

              <span className="text-sm font-semibold">
                System Status
              </span>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Your healthcare dashboard is ready.
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-emerald-700">
                All systems operational
              </span>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-400">
            Doctor Tracker © 2026
          </p>
        </div>
      </aside>
    </>
  );
}
