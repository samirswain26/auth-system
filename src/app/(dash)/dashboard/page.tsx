"use client";

import { useState } from "react";
import Link from "next/link";

const stats = [
  { label: "Total Sessions", value: "1,284", change: "+12%", up: true },
  { label: "Last Login", value: "Just now", change: "Active", up: true },
  { label: "Security Score", value: "98/100", change: "+3 pts", up: true },
  { label: "Devices Linked", value: "3", change: "Verified", up: true },
];

const activity = [
  { action: "Login successful", device: "Chrome · macOS", time: "2 min ago", type: "success" },
  { action: "Password changed", device: "Settings", time: "3 days ago", type: "warning" },
  { action: "New device added", device: "Safari · iPhone", time: "1 week ago", type: "info" },
  { action: "Login successful", device: "Firefox · Windows", time: "2 weeks ago", type: "success" },
  { action: "2FA enabled", device: "Security Settings", time: "1 month ago", type: "success" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Clear cookies/localStorage and redirect
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0d0d15] border-r border-white/5 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <svg className="w-4 h-4 text-[#0a0a0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
              </svg>
            </div>
            <span className="font-bold text-white text-base tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              AuthSystem
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: "Dashboard", active: true, icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
            )},
            { label: "Profile", active: false, icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            )},
            { label: "Security", active: false, icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            )},
            { label: "Sessions", active: false, icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" /></svg>
            )},
            { label: "Settings", active: false, icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )},
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                item.active
                  ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#0a0a0f] font-bold text-sm">
              J
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">John Doe</p>
              <p className="text-slate-500 text-xs truncate">john@example.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-slate-400 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div>
              <h1 className="text-white font-semibold text-lg" style={{ fontFamily: "Georgia, serif" }}>Dashboard</h1>
              <p className="text-slate-500 text-xs hidden sm:block">Wednesday, April 29, 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
            </button>
          </div>
        </header>

        <div className="p-6 max-w-5xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Account active
            </div>
            <h2 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>
              Good morning, John 👋
            </h2>
            <p className="text-slate-400 text-sm">Here's an overview of your account security and activity.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/8 bg-white/3 p-5 hover:border-amber-400/20 hover:bg-white/5 transition-all duration-300"
              >
                <p className="text-slate-500 text-xs mb-3">{stat.label}</p>
                <p className="text-white font-bold text-xl mb-1">{stat.value}</p>
                <span className={`text-xs font-medium ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.change}
                </span>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Activity Feed */}
            <div className="lg:col-span-3 rounded-2xl border border-white/8 bg-white/3 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-semibold" style={{ fontFamily: "Georgia, serif" }}>Recent Activity</h3>
                <button className="text-amber-400 text-xs hover:text-amber-300 transition-colors">View all</button>
              </div>
              <div className="space-y-4">
                {activity.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      item.type === "success" ? "bg-emerald-400" :
                      item.type === "warning" ? "bg-amber-400" : "bg-indigo-400"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm">{item.action}</p>
                      <p className="text-slate-500 text-xs">{item.device}</p>
                    </div>
                    <p className="text-slate-600 text-xs shrink-0">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Panel */}
            <div className="lg:col-span-2 space-y-4">
              {/* Security score */}
              <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/8 to-amber-600/3 p-6">
                <h3 className="text-white font-semibold mb-1" style={{ fontFamily: "Georgia, serif" }}>Security Score</h3>
                <p className="text-slate-400 text-xs mb-4">Your account is well-protected</p>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-4xl font-bold text-amber-400">98</span>
                  <span className="text-slate-500 text-sm mb-1">/100</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-gradient-to-r from-amber-400 to-amber-300 rounded-full" />
                </div>
              </div>

              {/* Quick actions */}
              <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
                <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "Georgia, serif" }}>Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: "Change password", icon: "🔑" },
                    { label: "Enable 2FA", icon: "🛡️" },
                    { label: "Download data", icon: "📦" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 text-left"
                    >
                      <span>{action.icon}</span>
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}