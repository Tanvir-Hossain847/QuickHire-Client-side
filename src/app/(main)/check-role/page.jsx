"use client";
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

export default function CheckRole() {
  const { user, userRole, loading } = useAuth();
  const [backendData, setBackendData] = useState(null);
  const [backendError, setBackendError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserFromBackend();
    }
  }, [user]);

  const fetchUserFromBackend = async () => {
    try {
      const response = await fetch(`https://quick-hire-server-side-jmmo.vercel.app/users/${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        setBackendData(data);
      } else {
        setBackendError(`Backend returned status: ${response.status}`);
      }
    } catch (error) {
      setBackendError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5848DF] mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
          <a href="/login" className="text-[#5848DF] hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Role Check Debug Page</h1>

        {/* Firebase Auth Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-[#5848DF]">Firebase Auth Info</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-semibold">UID:</div>
              <div className="font-mono text-sm">{user.uid}</div>
              
              <div className="font-semibold">Email:</div>
              <div>{user.email}</div>
              
              <div className="font-semibold">Display Name:</div>
              <div>{user.displayName || 'Not set'}</div>
              
              <div className="font-semibold">Photo URL:</div>
              <div className="truncate">{user.photoURL || 'Not set'}</div>
            </div>
          </div>
        </div>

        {/* Context Role Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-[#5848DF]">Context Role Info</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-semibold">User Role (from Context):</div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  userRole === 'admin' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {userRole}
                </span>
              </div>
              
              <div className="font-semibold">Is Admin?</div>
              <div className="font-bold">
                {userRole === 'admin' ? (
                  <span className="text-green-600">✓ YES</span>
                ) : (
                  <span className="text-red-600">✗ NO</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Backend Data */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-[#5848DF]">Backend Data</h2>
          {backendError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
              <p className="font-semibold">Error fetching from backend:</p>
              <p className="text-sm mt-2">{backendError}</p>
              <p className="text-sm mt-2">
                Make sure your backend is running on <code className="bg-red-100 px-2 py-1 rounded">https://quick-hire-server-side-jmmo.vercel.app</code>
              </p>
            </div>
          ) : backendData ? (
            <div className="space-y-2">
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(backendData, null, 2)}
              </pre>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="font-semibold text-blue-900">Backend Role:</p>
                <p className="text-2xl font-bold text-blue-700 mt-2">{backendData.role || 'NOT SET'}</p>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Loading backend data...</div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-900">How to Make Yourself Admin</h2>
          <div className="space-y-3 text-sm">
            <p>If you're not an admin, update your role in the database:</p>
            <div className="bg-white p-4 rounded border border-yellow-300">
              <p className="font-semibold mb-2">SQL:</p>
              <code className="block bg-gray-100 p-2 rounded text-xs">
                UPDATE users SET role = 'admin' WHERE uid = '{user.uid}';
              </code>
            </div>
            <div className="bg-white p-4 rounded border border-yellow-300">
              <p className="font-semibold mb-2">MongoDB:</p>
              <code className="block bg-gray-100 p-2 rounded text-xs">
                db.users.updateOne({'{'}uid: '{user.uid}'{'}}, {'{'} $set: {'{'} role: 'admin' {'}'} {'}'});
              </code>
            </div>
            <p className="mt-4 font-semibold">After updating:</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Logout from the app</li>
              <li>Login again</li>
              <li>Come back to this page to verify</li>
              <li>Try accessing <a href="/admin" className="text-[#5848DF] hover:underline">/admin</a></li>
            </ol>
          </div>
        </div>

        {/* Test Links */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Test Links</h2>
          <div className="space-y-2">
            <a 
              href="/admin" 
              className="block px-4 py-2 bg-[#5848DF] text-white rounded hover:bg-[#4a3bc6] transition-colors text-center"
            >
              Try Accessing Admin Dashboard
            </a>
            <button
              onClick={() => window.location.reload()}
              className="block w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
