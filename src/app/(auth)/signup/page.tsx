"use client";

import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };
  const strength = passwordStrength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-emerald-400"][strength];

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex overflow-hidden">
      {/* Left Panel — Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <svg className="w-4 h-4 text-[#0a0a0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
            </svg>
          </div>
          <span className="font-bold text-white text-lg tracking-tight" style={{ fontFamily: "Georgia, serif" }}>AuthSystem</span>
        </div>

        <div className="w-full max-w-md">
          {/* Success State */}
          {success ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>Account created!</h3>
              <p className="text-slate-400 text-sm">Redirecting you to sign in...</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>
                  Create account
                </h2>
                <p className="text-slate-400 text-sm">
                  Join us today — it only takes a minute
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 text-sm">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Name */}
                <div className="group">
                  <label className="block text-xs font-medium text-slate-400 mb-2 tracking-wide uppercase">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors duration-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 text-sm outline-none transition-all duration-200 focus:border-amber-400/50 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.07)]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-xs font-medium text-slate-400 mb-2 tracking-wide uppercase">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors duration-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 text-sm outline-none transition-all duration-200 focus:border-amber-400/50 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.07)]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="group">
                  <label className="block text-xs font-medium text-slate-400 mb-2 tracking-wide uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors duration-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder:text-slate-600 text-sm outline-none transition-all duration-200 focus:border-amber-400/50 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.07)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Password strength */}
                  {form.password.length > 0 && (
                    <div className="mt-3">
                      <div className="flex gap-1 mb-1.5">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              i <= strength ? strengthColor : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">
                        Password strength:{" "}
                        <span className={
                          strength === 4 ? "text-emerald-400" :
                          strength === 3 ? "text-yellow-400" :
                          strength === 2 ? "text-orange-400" : "text-red-400"
                        }>{strengthLabel}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms */}
                <p className="text-slate-500 text-xs leading-relaxed pt-1">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-amber-400 hover:text-amber-300">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-amber-400 hover:text-amber-300">Privacy Policy</a>.
                </p>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="relative w-full mt-1 overflow-hidden rounded-xl bg-linear-to-r from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-semibold text-[#0a0a0f] transition-all duration-200 hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-slate-600 text-xs">or</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              <p className="text-center text-slate-400 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
                  Sign in
                </Link>
              </p>

              <div className="mt-6 text-center">
                <Link href="/" className="text-slate-600 hover:text-slate-400 text-xs transition-colors flex items-center justify-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back to home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Panel — Decorative */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden bg-[#0d0d15] border-l border-white/5 p-12">
        <div className="absolute top-0 left-0 w-125 h-125 bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-100 h-100 bg-indigo-500/6 rounded-full blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <svg className="w-4 h-4 text-[#0a0a0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
            </svg>
          </div>
          <span className="font-bold text-white text-lg tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            AuthSystem
          </span>
        </div>

        {/* Features list */}
        <div className="relative z-10 space-y-5">
          <div className="w-10 h-0.75 bg-amber-400 rounded-full mb-8" />
          {[
            { icon: "🔒", title: "Bank-grade security", desc: "AES-256 encryption for all your data" },
            { icon: "⚡", title: "Instant access", desc: "Authenticate in under 50ms globally" },
            { icon: "🌍", title: "Global infrastructure", desc: "99.9% uptime SLA guaranteed" },
            { icon: "🛡️", title: "Privacy first", desc: "Your data stays yours — always" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-lg shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{f.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-slate-600 text-xs">© 2025 AuthSystem. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}