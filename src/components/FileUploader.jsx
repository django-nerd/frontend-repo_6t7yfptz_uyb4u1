import React from 'react';
import { Upload } from 'lucide-react';

function FileUploader({ onChange }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">Upload Sales Data (CSV)</h2>
      <p className="text-sm text-slate-500 mb-4">Drag and drop your CSV or click to select a file. The app will parse it for preview.</p>
      <label className="flex items-center justify-center gap-3 w-full h-28 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50/40 transition">
        <Upload className="h-5 w-5 text-slate-600" />
        <span className="text-slate-700">Choose CSV file</span>
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={onChange}
          className="hidden"
        />
      </label>
      <p className="mt-2 text-xs text-slate-500">We only process data in your browser for preview. No upload to a server.</p>
    </div>
  );
}

export default FileUploader;
