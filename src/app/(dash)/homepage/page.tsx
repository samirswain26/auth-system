"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  LayoutDashboard,
  User,
  Shield,
  Monitor,
  Settings,
  Key,
  LogOut,
  Menu,
  X,
  Bell,
  AlertCircle,
  CheckCircle,
  Loader2,
  Package
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const activity = [
  { action: "Login successful",  device: "Chrome · macOS",      time: "2 min ago",   type: "success" },
  { action: "Password changed",  device: "Settings",             time: "3 days ago",  type: "warning" },
  { action: "New device added",  device: "Safari · iPhone",      time: "1 week ago",  type: "info"    },
  { action: "Login successful",  device: "Firefox · Windows",    time: "2 weeks ago", type: "success" },
  { action: "2FA enabled",       device: "Security Settings",    time: "1 month ago", type: "success" },
];

const stats = [
  { label: "Total Sessions", value: "1,284", change: "+12%",    up: true  },
  { label: "Last Login",     value: "Just now", change: "Active",  up: true  },
  { label: "Security Score", value: "98/100",  change: "+3 pts",  up: true  },
  { label: "Devices Linked", value: "3",       change: "Verified",up: true  },
];


const Icons = {
  logo: <Package className="w-4 h-4 text-[#0a0a0f]" />,

  dashboard: <LayoutDashboard className="w-4 h-4" />,
  profile: <User className="w-4 h-4" />,
  security: <Shield className="w-4 h-4" />,
  sessions: <Monitor className="w-4 h-4" />,
  settings: <Settings className="w-4 h-4" />,
  key: <Key className="w-4 h-4" />,
  logout: <LogOut className="w-4 h-4" />,

  menu: <Menu className="w-5 h-5" />,
  close: <X className="w-5 h-5" />,
  bell: <Bell className="w-5 h-5" />,

  error: <AlertCircle className="w-4 h-4 shrink-0" />,
  check: <CheckCircle className="w-7 h-7 text-emerald-400" />,
  spin: <Loader2 className="w-4 h-4 animate-spin" />,
};


function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!form.currentPassword || !form.newPassword) { setError("Both fields are required."); return; }
    if (form.newPassword.length < 6) { setError("New password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Something went wrong."); setLoading(false); return; }
      setSuccess(true);
      setTimeout(() => { window.location.href = "/login"; }, 2000);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-[#0d0d15] border border-white/10 shadow-2xl overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              {Icons.key}
            </div>
            <h3 className="text-white font-semibold text-sm" style={{ fontFamily: "Georgia, serif" }}>
              Change Password
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
            {Icons.close}
          </button>
        </div>

        <div className="p-5">
          {success ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-3">
                {Icons.check}
              </div>
              <p className="text-white font-medium text-sm mb-1">Password updated!</p>
              <p className="text-slate-400 text-xs">Redirecting to sign in...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-red-400 text-xs">
                  {Icons.error}{error}
                </div>
              )}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">Current password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={form.currentPassword}
                  onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 text-sm outline-none transition-all focus:border-amber-400/40 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.06)]"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">New password</label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 text-sm outline-none transition-all focus:border-amber-400/40 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.06)]"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-white/8 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:border-white/15 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-[#0a0a0f] hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <>{Icons.spin} Saving...</> : "Update"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const navItems = [
  { label: "Dashboard", icon: Icons.dashboard, active: true  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen]       = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [user, setUser]                     = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Fetch real user from GET /api/auth/profile
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/profile", { credentials: "include" });
        if (!res.ok) { window.location.href = "/login"; return; }
        const data = await res.json();
        setUser(data.user);
      } catch {
        window.location.href = "/login";
      } finally {
        setProfileLoading(false);
      }
    })();
  }, []);

  // Close sidebar on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setSidebarOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (e) {
      console.error("Signout error:", e);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = "token=; Max-Age=0; path=/;";
      document.cookie = "token=; Max-Age=0; path=/homepage;"; // clear ghost cookie
      window.location.href = "/";
    }
  };

  const avatarInitial = user?.name?.charAt(0).toUpperCase() ?? "?";
  const firstName     = user?.name?.split(" ")[0] ?? "there";
  const hour          = new Date().getHours();
  const greeting      = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // ── Sidebar content (shared between desktop & mobile drawer) ───────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
          <div className="w-8 h-8 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/25 shrink-0">
            {Icons.logo}
          </div>
          <span className="font-bold text-white text-sm tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            AuthSystem
          </span>
        </Link>
        {/* Close button — mobile only */}
        <button
          className="lg:hidden text-slate-500 hover:text-white transition-colors p-1"
          onClick={() => setSidebarOpen(false)}
        >
          {Icons.close}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setSidebarOpen(false)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
              item.active
                ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom — user card + change password + sign out */}
      <div className="px-3 pb-4 pt-3 border-t border-white/5 space-y-1">
        {/* User card */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/3 mb-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#0a0a0f] font-bold text-xs shrink-0">
            {profileLoading ? "…" : avatarInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate leading-tight">
              {profileLoading ? "Loading..." : (user?.name ?? "—")}
            </p>
            <p className="text-slate-500 text-xs truncate leading-tight">
              {profileLoading ? "" : (user?.email ?? "")}
            </p>
          </div>
        </div>

        {/* Change password — right above sign out */}
        <button
          onClick={() => { setShowChangePass(true); setSidebarOpen(false); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-amber-400 hover:bg-amber-400/5 transition-all duration-150"
        >
          {Icons.key}
          Change password
        </button>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all duration-150"
        >
          {Icons.logout}
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {showChangePass && <ChangePasswordModal onClose={() => setShowChangePass(false)} />}

      <div className="min-h-screen bg-[#0a0a0f] text-white flex">

        <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[#0d0d15] border-r border-white/5 sticky top-0 h-screen overflow-hidden">
          <SidebarContent />
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0d15] border-r border-white/5 flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent />
        </aside>

        <main className="flex-1 min-w-0 flex flex-col">

          {/* Top bar */}
          <header className="sticky top-0 z-30 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Hamburger — mobile only */}
              <button
                className="lg:hidden text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                {Icons.menu}
              </button>
              <div>
                <h1 className="text-white font-semibold text-base sm:text-lg leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  Dashboard
                </h1>
                <p className="text-slate-500 text-xs hidden sm:block">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>

            {/* Right — notification + avatar */}
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                {Icons.bell}
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
              </button>
              {/* Avatar — tapping opens change-password on mobile too */}
              <button
                onClick={() => setShowChangePass(true)}
                className="w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#0a0a0f] font-bold text-xs shrink-0 hover:opacity-90 transition-opacity"
                title="Account settings"
              >
                {profileLoading ? "…" : avatarInitial}
              </button>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 p-4 sm:p-6 max-w-5xl w-full mx-auto">

            {/* Welcome */}
            <div className="mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Account active
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>
                {profileLoading ? "Loading..." : `${greeting}, ${firstName} 👋`}
              </h2>
              <p className="text-slate-400 text-sm">Here's an overview of your account security and activity.</p>
            </div>

            {/* Stats — 2 cols on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/8 bg-white/3 p-4 sm:p-5 hover:border-amber-400/20 hover:bg-white/5 transition-all duration-200"
                >
                  <p className="text-slate-500 text-xs mb-2 sm:mb-3">{stat.label}</p>
                  <p className="text-white font-bold text-lg sm:text-xl mb-0.5">{stat.value}</p>
                  <span className={`text-xs font-medium ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                    {stat.change}
                  </span>
                </div>
              ))}
            </div>

            {/* Content grid — stacks on mobile, side-by-side on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">

              {/* Activity feed */}
              <div className="lg:col-span-3 rounded-2xl border border-white/8 bg-white/3 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm sm:text-base" style={{ fontFamily: "Georgia, serif" }}>
                    Recent Activity
                  </h3>
                  <button className="text-amber-400 text-xs hover:text-amber-300 transition-colors">
                    View all
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {activity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        item.type === "success" ? "bg-emerald-400" :
                        item.type === "warning" ? "bg-amber-400" : "bg-indigo-400"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm leading-tight">{item.action}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{item.device}</p>
                      </div>
                      <p className="text-slate-600 text-xs shrink-0 mt-0.5">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security panel */}
              <div className="lg:col-span-2 flex flex-col gap-4">

                {/* Security score */}
                <div className="rounded-2xl border border-amber-400/20 bg-linear-to-br from-amber-400/8 to-transparent p-4 sm:p-6">
                  <h3 className="text-white font-semibold text-sm mb-0.5" style={{ fontFamily: "Georgia, serif" }}>
                    Security Score
                  </h3>
                  <p className="text-slate-400 text-xs mb-4">Your account is well-protected</p>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-3xl sm:text-4xl font-bold text-amber-400">98</span>
                    <span className="text-slate-500 text-sm mb-0.5">/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-linear-to-r from-amber-400 to-amber-300 rounded-full" />
                  </div>
                </div>

                {/* Quick actions */}
                <div className="rounded-2xl border border-white/8 bg-white/3 p-4 sm:p-5">
                  <h3 className="text-white font-semibold text-sm mb-3" style={{ fontFamily: "Georgia, serif" }}>
                    Quick Actions
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setShowChangePass(true)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-amber-400 hover:bg-amber-400/5 transition-all duration-150 text-left"
                    >
                      {Icons.key}
                      Change password
                    </button>
                    {[
                      { label: "Enable 2FA",     emoji: "🛡️" },
                      { label: "Download data",  emoji: "📦" },
                    ].map((a) => (
                      <button
                        key={a.label}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-150 text-left"
                      >
                        <span className="text-base">{a.emoji}</span>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}