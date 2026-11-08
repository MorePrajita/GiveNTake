import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowLeft } from 'lucide-react';

export default function AdminLogin({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid admin credentials');

      // Save admin session
      localStorage.setItem('admin', JSON.stringify(data.admin));
      onNavigate('admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-brandNavy flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="absolute top-6 left-6">
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-2 text-white font-semibold hover:underline cursor-pointer text-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6 border border-slate-200">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-brandPink text-brandNavy rounded-2xl mx-auto flex items-center justify-center font-black shadow-sm">
            <Shield size={24} />
          </div>
          <h2 className="text-2xl font-black text-brandNavy">Admin Portal</h2>
          <p className="text-xs text-slate-500">Sign in with authorized super admin credentials</p>
        </div>

        {error && <div className="p-3 bg-red-100 text-red-700 text-xs rounded-xl text-center font-medium">{error}</div>}

        <form onSubmit={handleAdminSignIn} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">Admin Email</label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-3.5 text-slate-400"><Mail size={16} /></span>
              <input 
                type="email" 
                required
                placeholder="admin@giventake.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brandSky"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">Password</label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-3.5 text-slate-400"><Lock size={16} /></span>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brandSky"
              />
            </div>
          </div>

          <button type="submit" className="w-full py-3.5 bg-brandNavy text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition cursor-pointer">
            Access Admin Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}