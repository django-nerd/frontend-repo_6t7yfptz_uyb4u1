import React from 'react';

function prettyNumber(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return '-';
  return n.toLocaleString();
}

function prettyCurrency(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return '-';
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function Kpi({ label, value, accent = 'blue' }) {
  const accentMap = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    violet: 'bg-violet-50 text-violet-700',
    orange: 'bg-orange-50 text-orange-700',
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-800">{value}</p>
      <div className={`mt-4 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${accentMap[accent]}`}>Updated</div>
    </div>
  );
}

function KpiCards({ rows }) {
  // rows: [{ label, value, type: 'currency'|'number', accent }]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {rows.map((r, idx) => (
        <Kpi
          key={idx}
          label={r.label}
          value={r.type === 'currency' ? prettyCurrency(r.value) : prettyNumber(r.value)}
          accent={r.accent}
        />
      ))}
    </div>
  );
}

export default KpiCards;
