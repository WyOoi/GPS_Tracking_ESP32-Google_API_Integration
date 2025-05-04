'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // --- Placeholder Login Logic --- 
    // In a real app, you'd validate against a backend/API
    if (username === 'admin' && password === 'password') { 
      // Simulate successful login
      console.log('Login successful');
      // Store login state (e.g., in localStorage or context/state management)
      // For now, we'll just redirect
      localStorage.setItem('isLoggedIn', 'true'); // Very basic state persistence
      localStorage.setItem('loginType', 'user'); // Indicate user login
      router.push('/'); // Redirect to the main page after login
    } else {
      setError('Invalid username or password');
    }
    // --- End Placeholder Logic ---
  };

  // --- Guest Login Handler ---
  const handleGuestLogin = () => {
      console.log('Guest login');
      localStorage.setItem('isLoggedIn', 'true'); // Treat guest as logged in for access
      localStorage.setItem('loginType', 'guest'); // Indicate guest login
      router.push('/'); // Redirect to the main page
  };
  // --- End Guest Login Handler ---

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Bus Tracker Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username (e.g., admin)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password (e.g., password)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Guest Login Button */}
        <div>
          <button
            type="button" // Important: type="button" to prevent form submission
            onClick={handleGuestLogin}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login as Guest
          </button>
        </div>

      </div>
    </div>
  );
}
