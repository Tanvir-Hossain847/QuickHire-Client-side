"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/firebase';

export default function FirebaseDebug() {
  const [status, setStatus] = useState({
    auth: 'checking...',
    firestore: 'checking...',
    envVars: 'checking...'
  });

  useEffect(() => {
    // Check Auth
    try {
      if (auth) {
        setStatus(prev => ({ ...prev, auth: '✅ Connected' }));
      } else {
        setStatus(prev => ({ ...prev, auth: '❌ Not initialized' }));
      }
    } catch (error) {
      setStatus(prev => ({ ...prev, auth: `❌ Error: ${error.message}` }));
    }

    // Check Firestore
    try {
      if (db) {
        setStatus(prev => ({ ...prev, firestore: '✅ Connected' }));
      } else {
        setStatus(prev => ({ ...prev, firestore: '❌ Not initialized' }));
      }
    } catch (error) {
      setStatus(prev => ({ ...prev, firestore: `❌ Error: ${error.message}` }));
    }

    // Check Environment Variables
    const envVars = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    };

    const missingVars = Object.entries(envVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length === 0) {
      setStatus(prev => ({ ...prev, envVars: '✅ All set' }));
    } else {
      setStatus(prev => ({ 
        ...prev, 
        envVars: `❌ Missing: ${missingVars.join(', ')}` 
      }));
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2 text-sm">Firebase Status</h3>
      <div className="space-y-1">
        <div><strong>Auth:</strong> {status.auth}</div>
        <div><strong>Firestore:</strong> {status.firestore}</div>
        <div><strong>Env Vars:</strong> {status.envVars}</div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-200 text-gray-500">
        <div>Project: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not set'}</div>
      </div>
    </div>
  );
}
