"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative flex flex-col items-center justify-center px-4">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Logo / Brand */}
      <div className="relative z-10 flex flex-col items-center text-center mb-16 animate-fade-in">
        {/* Icon mark */}
        <div className="mb-6 relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <svg
              className="w-8 h-8 text-[#0a0a0f]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
              />
            </svg>
          </div>
          <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-amber-400/20 blur-xl" />
        </div>

        <h1
          className="text-5xl sm:text-6xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Auth
          <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            System
          </span>
        </h1>

        <p className="text-slate-400 text-lg max-w-md leading-relaxed">
          A secure, modern authentication experience built for the next
          generation of web applications.
        </p>
      </div>

      {/* CTA Cards */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-md">
        {/* Login Card */}
        <Link
          href="/login"
          className="group flex-1 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:border-amber-400/40 hover:bg-white/8 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors duration-300">
            <svg
              className="w-5 h-5 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-semibold text-white text-base">Sign In</p>
            <p className="text-slate-400 text-sm mt-0.5">Welcome back</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Signup Card */}
        <Link
          href="/signup"
          className="group flex-1 relative overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/15 to-amber-600/5 backdrop-blur-md p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center group-hover:bg-amber-400/30 transition-colors duration-300">
            <svg
              className="w-5 h-5 text-amber-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-semibold text-white text-base">Create Account</p>
            <p className="text-slate-400 text-sm mt-0.5">Get started free</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

      {/* Footer */}
      <p className="relative z-10 mt-16 text-slate-600 text-xs tracking-widest uppercase">
        Secure · Fast · Reliable
      </p>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
}