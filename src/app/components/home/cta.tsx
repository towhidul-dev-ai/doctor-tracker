
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-16 text-center sm:px-12 lg:py-20">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
              <ShieldCheck size={28} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to simplify healthcare management?
            </h2>

            <p className="mt-5 leading-7 text-blue-100">
              Bring doctor management, patient records, and healthcare
              analytics together in one organized platform.
            </p>

            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
