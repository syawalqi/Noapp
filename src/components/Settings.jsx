import React, { useState } from 'react';
import { exportData, importData } from '../services/dataService';
import { downloadFile, pickAndReadFile } from '../utils/file';
import { Database, Download, Upload, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Settings = () => {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFullExport = async () => {
    setIsProcessing(true);
    setStatus({ type: '', message: '' });
    try {
      const data = await exportData();
      const jsonString = JSON.stringify(data, null, 2);
      downloadFile(jsonString, `noapp-backup-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
      setStatus({ type: 'success', message: 'Backup downloaded successfully!' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to generate backup.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFullImport = async () => {
    if (!confirm('Warning: Importing a backup will overwrite ALL existing data. Are you sure you want to proceed?')) {
      return;
    }

    setIsProcessing(true);
    setStatus({ type: '', message: '' });
    try {
      const content = await pickAndReadFile('.json');
      const data = JSON.parse(content);
      await importData(data);
      setStatus({ type: 'success', message: 'Data restored successfully! Refreshing...' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to import data.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 bg-paper-50 p-8 md:p-16 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-paper-900 mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Data Management Section */}
          <section>
            <div className="flex items-center mb-4">
              <Database className="h-5 w-5 mr-2 text-paper-700" />
              <h2 className="text-lg font-serif font-semibold text-paper-800">Data Management</h2>
            </div>
            
            <div className="papery-card p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-paper-900">Backup your data</h3>
                  <p className="text-xs text-paper-600">Download all your folders and notes as a single JSON file.</p>
                </div>
                <button
                  onClick={handleFullExport}
                  disabled={isProcessing}
                  className="flex items-center justify-center px-4 py-2 bg-paper-200 text-paper-800 rounded-sm hover:bg-paper-300 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Backup
                </button>
              </div>

              <hr className="border-paper-100" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-paper-900">Restore from backup</h3>
                  <p className="text-xs text-paper-600">Overwrite current data with a previously exported backup file.</p>
                </div>
                <button
                  onClick={handleFullImport}
                  disabled={isProcessing}
                  className="flex items-center justify-center px-4 py-2 border border-paper-300 text-paper-700 rounded-sm hover:bg-paper-100 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Backup
                </button>
              </div>
            </div>
          </section>

          {/* Feedback Status */}
          {status.message && (
            <div className={`p-4 rounded-sm flex items-start ${
              status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 mr-3 shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 mr-3 shrink-0" />
              )}
              <span className="text-sm">{status.message}</span>
            </div>
          )}

          {/* About Section */}
          <section className="pt-8 border-t border-paper-200">
            <p className="text-xs text-paper-400 italic">
              NoApp is a privacy-first, zero-backend application. Your data never leaves this device unless you explicitly export it.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
