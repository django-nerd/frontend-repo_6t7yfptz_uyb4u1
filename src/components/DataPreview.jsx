import React from 'react';

function DataPreview({ csvText, filename }) {
  if (!csvText) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500 text-sm">
        No file selected yet. Pick a CSV to see a quick preview.
      </div>
    );
  }

  // Create a small preview table (first 8 lines)
  const lines = csvText.split(/\r?\n/).filter(Boolean);
  const headers = lines[0]?.split(',') ?? [];
  const rows = lines.slice(1, 9).map((l) => l.split(','));

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
        <div>
          <p className="text-sm font-medium text-slate-700">Preview</p>
          <p className="text-xs text-slate-500">{filename} • showing first {rows.length} rows</p>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2 font-semibold text-slate-700 whitespace-nowrap border-b border-slate-200">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="odd:bg-white even:bg-slate-50">
                {r.map((c, j) => (
                  <td key={j} className="px-4 py-2 text-slate-700 whitespace-nowrap border-b border-slate-100">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataPreview;
