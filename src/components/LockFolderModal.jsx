import React, { useState } from 'react';
import { lockFolder } from '../services/securityService';
import { X, Lock, AlertTriangle } from 'lucide-react';

const LockFolderModal = ({ folder, onClose, onLocked }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      await lockFolder(folder.id, password);
      onLocked();
      onClose();
    } catch (err) {
      setError('Failed to lock folder. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="papery-card w-full max-w-md shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center text-paper-800">
              <Lock className="mr-2 h-5 w-5" />
              <h2 className="text-xl font-serif font-bold">Lock Folder</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-paper-200 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-paper-700" />
            </button>
          </div>

          <p className="text-sm text-paper-700 mb-6">
            Setting a password for <strong className="text-paper-900">"{folder.name}"</strong> will hide its contents until unlocked.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-paper-700 uppercase tracking-wider mb-2">
                New Password
              </label>
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-paper-100 border-b-2 border-paper-300 focus:border-paper-700 outline-none p-2 text-lg transition-colors font-sans"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-paper-700 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-paper-100 border-b-2 border-paper-300 focus:border-paper-700 outline-none p-2 text-lg transition-colors font-sans"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm flex items-start bg-red-50 p-3 rounded-sm">
                <AlertTriangle className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-sm border border-amber-100 flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Important:</strong> There is no password recovery. If you forget this password, the contents of this folder will be permanently inaccessible.
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-paper-700 hover:text-paper-900 mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-paper-800 text-paper-50 rounded-sm shadow-md hover:bg-paper-900 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Locking...' : 'Lock Folder'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LockFolderModal;
