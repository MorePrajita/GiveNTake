// import React, { useState } from 'react';

// export default function SignIn({ onSwitchToSignUp, onNavigate }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error);
      
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       alert('Logged in successfully!');
//       onNavigate('browse'); // Switch to browse feed directly
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-brandCream flex items-center justify-center p-6">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-slate-200 text-center">
//         <div className="flex items-center justify-center space-x-2 mb-6 cursor-pointer" onClick={() => onNavigate('landing')}>
//           <div className="w-8 h-8 rounded-lg bg-brandNavy flex items-center justify-center text-white font-bold">⇄</div>
//           <span className="text-xl font-black text-brandNavy">GiveNTake</span>
//         </div>

//         <h2 className="text-xl font-bold text-brandNavy mb-1">Welcome Back</h2>
//         <p className="text-xs text-slate-500 mb-6">Sign in to access your campus marketplace.</p>

//         {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-xs rounded-xl">{error}</div>}

//         <form onSubmit={handleLogin} className="space-y-4 text-left">
//           <div>
//             <label className="text-xs font-semibold text-slate-600 uppercase">College Email</label>
//             <input 
//               type="email" required placeholder="name@college.edu"
//               className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="text-xs font-semibold text-slate-600 uppercase">Password</label>
//             <input 
//               type="password" required placeholder="••••••••"
//               className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button type="submit" className="w-full py-3.5 bg-brandNavy text-white font-semibold rounded-xl shadow-md hover:bg-slate-800 transition text-sm">
//             Log In
//           </button>
//         </form>

//         <p className="text-xs text-slate-500 mt-6">
//           Don't have an account?{' '}
//           <button onClick={onSwitchToSignUp} className="text-brandNavy font-bold hover:underline">
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';

export default function SignIn({ onSwitchToSignUp, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.user.role === 'admin') {
        localStorage.setItem('admin', JSON.stringify(data.user));
        alert('Admin logged in successfully!');
        onNavigate('admin'); // Automatically opens Admin Panel
      } else {
        alert('Logged in successfully!');
        onNavigate('browse'); // Switch to browse feed directly
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-brandCream flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-slate-200 text-center">
        <div className="flex items-center justify-center space-x-2 mb-6 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-8 h-8 rounded-lg bg-brandNavy flex items-center justify-center text-white font-bold">⇄</div>
          <span className="text-xl font-black text-brandNavy">GiveNTake</span>
        </div>

        <h2 className="text-xl font-bold text-brandNavy mb-1">Welcome Back</h2>
        <p className="text-xs text-slate-500 mb-6">Sign in to access your campus marketplace.</p>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-xs rounded-xl">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">College Email</label>
            <input 
              type="email" required placeholder="name@college.edu"
              className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">Password</label>
            <input 
              type="password" required placeholder="••••••••"
              className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full py-3.5 bg-brandNavy text-white font-semibold rounded-xl shadow-md hover:bg-slate-800 transition text-sm">
            Log In
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-6">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignUp} className="text-brandNavy font-bold hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}