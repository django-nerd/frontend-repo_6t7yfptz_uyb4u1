import React from 'react';

function Header() {
  return (
    <header className="w-full sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">SA</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Sales Analysis & Insights</h1>
            <p className="text-sm text-slate-500">Upload your CSV and explore KPIs, trends, and opportunities</p>
          </div>
        </div>
        <a
          className="hidden sm:inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          Powered by Vite + React
        </a>
      </div>
    </header>
  );
}

export default Header;
