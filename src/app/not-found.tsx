
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Home,
  Search,
} from "lucide-react";

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-xl text-center">

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl border border-teal-500/20 bg-teal-500/10 p-5">
            <Search className="h-10 w-10 text-teal-400" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight text-teal-400 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-400">
          Sorry! The page you are looking for doesn't exist,
          has been moved, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-400"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

        <p className="mt-12 text-sm text-slate-500">
          Doctor Tracker · Healthcare Management System
        </p>

      </div>
    </main>
  );
}
