
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Stethoscope,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-16 shadow-2xl shadow-blue-900/20 sm:px-12 lg:py-24">

          {/* Background decorations */}
          <div className="absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 -z-10 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

          <div className="absolute right-12 top-10 hidden rotate-12 text-white/[0.06] lg:block">
            <Stethoscope size={180} strokeWidth={1} />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">

            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-sm">
              <ShieldCheck size={32} strokeWidth={1.8} />
            </div>

            {/* Heading */}
            <h2 className="mt-7 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Smarter Healthcare Management Starts Here
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              Manage doctors, organize patient records, and streamline
              healthcare operations with one simple and efficient platform.
            </p>

            {/* CTA Button */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl"
              >
                Get Started
                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Trust message */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-blue-100">
              <Activity size={16} />
              <span>Simple, organized, and efficient healthcare management</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
