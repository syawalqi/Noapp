import React, { useState } from 'react';
import { verifyFolderPassword } from '../services/securityService';
import { Lock, Unlock, AlertCircle } from 'lucide-react';

const UnlockFolderDialog = ({ folderId, folderName, onUnlocked }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    try {
      const isValid = await verifyFolderPassword(folderId, password);
      if (isValid) {
        onUnlocked(folderId);
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex-1 bg-paper-100 flex items-center justify-center p-6">
      <div className="papery-card w-full max-w-sm shadow-lg p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="mb-6 flex justify-center">
          <div className="bg-paper-200 p-4 rounded-full">
            <Lock className="h-8 w-8 text-paper-800" />
          </div>
        </div>

        <h2 className="text-2xl font-serif font-bold text-paper-900 mb-2">Folder Locked</h2>
        <p className="text-paper-700 text-sm mb-8">
          Please enter the password to view <strong className="text-paper-900">"{folderName}"</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-paper-50 border-b-2 border-paper-300 focus:border-paper-700 outline-none p-3 text-center transition-colors font-sans"
          />

          {error && (
            <div className="text-red-600 text-xs flex items-center justify-center bg-red-50 p-2 rounded-sm">
              <AlertCircle className="h-3 w-3 mr-1.5" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full mt-4 px-6 py-3 bg-paper-800 text-paper-50 rounded-sm shadow-md hover:bg-paper-900 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center"
          >
            {isVerifying ? 'Verifying...' : (
              <>
                <Unlock className="h-4 w-4 mr-2" />
                Unlock Folder
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UnlockFolderDialog;
