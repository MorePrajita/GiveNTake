import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function SignUp({ onSwitchToSignIn, onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prn: '',
    department: '',
    year: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert('Account created successfully! Please sign in.');
      onSwitchToSignIn();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-brandCream flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 rounded-lg bg-brandNavy flex items-center justify-center text-white font-bold">⇄</div>
            <span className="text-xl font-black text-brandNavy">GiveNTake</span>
          </div>
          <button onClick={onSwitchToSignIn} className="text-sm font-semibold text-brandNavy hover:underline flex items-center space-x-1">
            <ArrowLeft size={16} />
            <span>Sign In</span>
          </button>
        </div>

        <h2 className="text-2xl font-black text-brandNavy mb-2">Student Registration</h2>
        <p className="text-sm text-slate-500 mb-6">Verify your PRN to join your college marketplace.</p>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">Full Name</label>
            <input 
              type="text" required placeholder="Priya Sharma"
              className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">College Email</label>
            <input 
              type="email" required placeholder="name@college.edu"
              className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">PRN Number</label>
            <input 
              type="text" required placeholder="2025MCA0042"
              className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
              onChange={(e) => setFormData({...formData, prn: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">Department</label>
              <input 
                type="text" required placeholder="MCA"
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">Year</label>
              <input 
                type="number" required placeholder="2"
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
                onChange={(e) => setFormData({...formData, year: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">Password</label>
            <input 
              type="password" required placeholder="••••••••"
              className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full py-3.5 bg-brandNavy text-white font-semibold rounded-xl shadow-md hover:bg-slate-800 transition">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}