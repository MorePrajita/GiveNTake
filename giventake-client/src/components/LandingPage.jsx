// import React from 'react';
// import { ShieldCheck, ArrowRight, Search, PlusCircle, UserCheck, MessageSquare, MapPin } from 'lucide-react';

// export default function LandingPage({ onNavigate }) {
//   return (
//     <div className="min-h-screen bg-brandCream text-slate-800 flex flex-col">
//       {/* Navbar */}
//       <nav className="w-full px-8 py-5 flex items-center justify-between border-b border-slate-200/40 bg-brandCream/80 backdrop-blur-md sticky top-0 z-50">
//         <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('landing')}>
//           <div className="w-10 h-10 rounded-xl bg-brandNavy flex items-center justify-center text-white font-bold text-xl shadow-md">
//             ⇄
//           </div>
//           <span className="text-2xl font-black tracking-tight text-brandNavy">GiveNTake</span>
//         </div>
//         <div className="hidden md:flex items-center space-x-8 font-medium text-slate-700">
//           <a href="#how-it-works" className="hover:text-brandNavy transition">How It Works</a>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button 
//             onClick={() => onNavigate('signin')} 
//             className="px-5 py-2.5 font-semibold text-brandNavy hover:text-slate-900 transition"
//           >
//             Sign In
//           </button>
//           <button 
//             onClick={() => onNavigate('signup')} 
//             className="px-5 py-2.5 bg-brandNavy text-white font-semibold rounded-xl shadow-md hover:bg-slate-800 transition flex items-center space-x-2"
//           >
//             <PlusCircle size={18} />
//             <span>Sell</span>
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="w-full px-8 lg:px-16 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
//         <div className="lg:col-span-7 space-y-6">
//           <div className="inline-flex items-center space-x-2 bg-brandPink/20 text-brandNavy px-4 py-1.5 rounded-full text-sm font-semibold border border-brandPink/40">
//             <ShieldCheck size={16} className="text-brandNavy" />
//             <span>100% PRN Verified Students Only</span>
//           </div>
          
//           <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-brandNavy tracking-tight leading-tight">
//             Turn Your Used Campus Gear Into Instant Cash.
//           </h1>
          
//           <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
//             The exclusive marketplace for verified students to trade books, cycles, electronics, and lab equipment safely on campus.
//           </p>

//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
//             <button 
//               onClick={() => onNavigate('signup')} 
//               className="px-8 py-4 bg-brandNavy text-white font-semibold rounded-xl shadow-lg hover:bg-slate-800 transition flex items-center justify-center space-x-2 text-base"
//             >
//               <span>Get Started / Sign Up</span>
//               <ArrowRight size={18} />
//             </button>
//           </div>

//           <div className="text-sm text-slate-500 pt-2">
//             Already have an account?{' '}
//             <button onClick={() => onNavigate('signin')} className="text-brandNavy font-bold underline">
//               Sign in here
//             </button>
//           </div>
//         </div>

//         {/* Hero Visual Mockup Preview */}
//         <div className="lg:col-span-5 relative flex justify-center">
//           <div className="w-full max-w-md bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border-4 border-slate-800 text-white relative">
//             <div className="bg-brandCream text-slate-800 rounded-[1.8rem] p-5 mt-2 space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="font-black text-brandNavy text-lg">GiveNTake</span>
//                 <span className="text-xs bg-brandSky/40 px-2.5 py-1 rounded-full font-medium">Verified App</span>
//               </div>
//               <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
//                 <div className="h-36 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-medium">
//                   Item Photo Preview
//                 </div>
//                 <div className="font-bold text-base">Data Structures Textbook</div>
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="text-brandPink font-bold">₹250 (Fair Price)</span>
//                   <span className="text-slate-500">CSE Dept</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
import React from 'react';
import { ShieldCheck, MessageSquare, MapPin, ArrowRight, PlusCircle, UserCheck } from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-brandCream text-slate-800 flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-8 py-5 flex items-center justify-between border-b border-slate-200/40 bg-brandCream/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-10 h-10 rounded-xl bg-brandNavy flex items-center justify-center text-white font-bold text-xl shadow-md">
            ⇄
          </div>
          <span className="text-2xl font-black tracking-tight text-brandNavy">GiveNTake</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 font-medium text-slate-700">
          <a href="#how-it-works" className="hover:text-brandNavy transition">How It Works</a>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onNavigate('signin')}
            className="px-5 py-2.5 font-semibold text-brandNavy hover:text-slate-900 transition cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={() => onNavigate('signup')}
            className="px-5 py-2.5 bg-brandNavy text-white font-semibold rounded-xl shadow-md hover:bg-slate-800 transition flex items-center space-x-2 cursor-pointer"
          >
            <PlusCircle size={18} />
            <span>Sell</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full px-8 lg:px-16 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-brandPink/20 text-brandNavy px-4 py-1.5 rounded-full text-sm font-semibold border border-brandPink/40">
            <ShieldCheck size={16} className="text-brandNavy" />
            <span>100% PRN Verified Students Only</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-brandNavy tracking-tight leading-tight">
            Turn Your Used Campus Gear Into Instant Cash.
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
            The exclusive marketplace for verified students to trade books, cycles, electronics, and lab equipment safely on campus.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
            <button 
              onClick={() => onNavigate('signup')}
              className="px-8 py-4 bg-brandNavy text-white font-semibold rounded-xl shadow-lg hover:bg-slate-800 transition flex items-center justify-center space-x-2 text-base cursor-pointer max-w-xs"
            >
              <span>Sign Up with PRN</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="text-sm text-slate-500 pt-2">
            Already have an account?{' '}
            <button onClick={() => onNavigate('signin')} className="text-brandNavy font-bold underline cursor-pointer">
              Sign in here
            </button>
          </div>
        </div>

        {/* Hero Visual Mockup Preview */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="w-full max-w-md bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border-4 border-slate-800 text-white relative">
            <div className="bg-brandCream text-slate-800 rounded-[1.8rem] p-5 mt-2 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-black text-brandNavy text-lg">GiveNTake</span>
                <span className="text-xs bg-brandSky/40 px-2.5 py-1 rounded-full font-medium">Verified App</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                <div className="h-36 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-medium">
                  Item Photo Preview
                </div>
                <div className="font-bold text-base">Data Structures Textbook</div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-brandPink font-bold">₹250 (Fair Price)</span>
                  <span className="text-slate-500">CSE Dept</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works / Value Proposition */}
      <section id="how-it-works" className="w-full px-8 lg:px-16 py-20 bg-white/40 border-t border-slate-200/60">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-brandNavy">Simple, Safe Campus Exchanges</h2>
          <p className="text-slate-600 text-lg">Designed specifically for university students to buy and sell without hassle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="w-12 h-12 bg-brandSky/20 text-brandNavy rounded-xl flex items-center justify-center">
              <UserCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-brandNavy">Verify and List</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Register securely with your college PRN. Upload items with automated price suggestions in seconds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="w-12 h-12 bg-brandSky/20 text-brandNavy rounded-xl flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold text-brandNavy">Securely Chat</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Connect directly inside the app through real-time chat without sharing your personal phone number.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="w-12 h-12 bg-brandSky/20 text-brandNavy rounded-xl flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-brandNavy">Hand Off on Campus</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Meet up safely at trusted campus locations between classes to exchange items and complete your deal.
            </p>
          </div>
          <button onClick={() => onNavigate('admin-login')} className="text-xs text-slate-400 hover:text-brandNavy underline cursor-pointer">
  Admin Portal Login
</button>
        </div>
      </section>
    </div>
  );
}