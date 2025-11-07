import React, { useState } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import KpiCards from './components/KpiCards';
import DataPreview from './components/DataPreview';

function App() {
  const [fileName, setFileName] = useState('');
  const [csvText, setCsvText] = useState('');
  const [kpis, setKpis] = useState([
    { label: 'Total Orders', value: 0, type: 'number', accent: 'blue' },
    { label: 'Total Sales', value: 0, type: 'currency', accent: 'green' },
    { label: 'Total Profit', value: 0, type: 'currency', accent: 'violet' },
    { label: 'Unique Customers', value: 0, type: 'number', accent: 'orange' },
  ]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    setCsvText(text);

    // Quick KPI estimation from CSV (very lightweight):
    try {
      const lines = text.split(/\r?\n/).filter(Boolean);
      const header = lines[0].split(',');
      const rows = lines.slice(1).map((l) => l.split(','));

      const idxSales = header.findIndex((h) => h.trim().toLowerCase() === 'sales');
      const idxProfit = header.findIndex((h) => h.trim().toLowerCase() === 'profit');
      const idxCustomer = header.findIndex((h) => h.trim().toLowerCase().includes('customer'));

      let totalSales = 0;
      let totalProfit = 0;
      const customers = new Set();

      rows.forEach((r) => {
        if (idxSales !== -1) totalSales += Number(r[idxSales]) || 0;
        if (idxProfit !== -1) totalProfit += Number(r[idxProfit]) || 0;
        if (idxCustomer !== -1) customers.add(r[idxCustomer]);
      });

      setKpis([
        { label: 'Total Rows', value: rows.length, type: 'number', accent: 'blue' },
        { label: 'Total Sales', value: totalSales, type: 'currency', accent: 'green' },
        { label: 'Total Profit', value: totalProfit, type: 'currency', accent: 'violet' },
        { label: 'Unique Customers', value: customers.size, type: 'number', accent: 'orange' },
      ]);
    } catch (err) {
      console.error('Failed to parse quick KPIs', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <KpiCards rows={kpis} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FileUploader onChange={handleFileChange} />
          <DataPreview csvText={csvText} filename={fileName} />
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">About this demo</h2>
          <p className="text-sm text-slate-600">
            This lightweight front-end mirrors the look-and-feel of a sales analytics app. You can drop a CSV to see a preview and quick KPIs computed in your browser. For advanced forecasting, clustering, and mapping like your Streamlit example, we would wire this UI to a backend API with proper data models and persistence.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
