// import React, { useState, useEffect } from 'react';
// import { LayoutDashboard, Users, Tag, AlertTriangle, CheckCircle, XCircle, LogOut, Search } from 'lucide-react';

// export default function AdminPanel({ onNavigate }) {
//   const [currentTab, setCurrentTab] = useState('dashboard');
//   const [stats, setStats] = useState({ users: 0, listings: 0, reports: 3 });
//   const [flaggedListings, setFlaggedListings] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [newCategoryName, setNewCategoryName] = useState('');

//   const adminUser = JSON.parse(localStorage.getItem('user') || '{}');

//   useEffect(() => {
//     fetchAdminStats();
//     fetchFlaggedListings();
//     fetchUsers();
//     fetchCategories();
//   }, []);

//   const fetchAdminStats = () => {
//     fetch('http://localhost:5000/api/admin/stats')
//       .then(res => res.json())
//       .then(data => setStats(data))
//       .catch(() => setStats({ users: 312, listings: 148, reports: 3 }));
//   };

//   const fetchFlaggedListings = () => {
//     fetch('http://localhost:5000/api/admin/flagged-listings')
//       .then(res => res.json())
//       .then(data => Array.isArray(data) && setFlaggedListings(data))
//       .catch(() => {
//         // Mock fallback matching mockup
//         setFlaggedListings([
//           { listing_id: 101, title: 'Old Nokia phone', reporter: 'Sneha P.', status: 'flagged' }
//         ]);
//       });
//   };

//   const fetchUsers = () => {
//     fetch('http://localhost:5000/api/admin/users')
//       .then(res => res.json())
//       .then(data => Array.isArray(data) && setAllUsers(data))
//       .catch(() => {});
//   };

//   const fetchCategories = () => {
//     fetch('http://localhost:5000/api/categories')
//       .then(res => res.json())
//       .then(data => Array.isArray(data) && setCategories(data))
//       .catch(() => {});
//   };

//   const handleModerateListing = async (listingId, action) => {
//     try {
//       await fetch(`http://localhost:5000/api/admin/listings/${listingId}/moderate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ action }) // 'approve' or 'remove'
//       });
//       fetchFlaggedListings();
//       fetchAdminStats();
//     } catch (err) {
//       console.error('Moderation error:', err);
//     }
//   };

//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     if (!newCategoryName.trim()) return;
//     try {
//       await fetch('http://localhost:5000/api/admin/categories', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: newCategoryName })
//       });
//       setNewCategoryName('');
//       fetchCategories();
//     } catch (err) {
//       console.error('Failed to add category:', err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     onNavigate('landing');
//   };

//   return (
//     <div className="min-h-screen bg-brandCream flex text-slate-800">
//       {/* Sidebar */}
//       <aside className="w-64 bg-brandNavy text-white flex flex-col justify-between p-6 shrink-0 shadow-lg">
//         <div className="space-y-8">
//           <div className="flex items-center space-x-2">
//             <div className="w-9 h-9 rounded-xl bg-brandPink flex items-center justify-center text-brandNavy font-bold text-lg">⇄</div>
//             <span className="text-2xl font-black tracking-tight">GiveNTake</span>
//           </div>

//           <nav className="space-y-2">
//             <button 
//               onClick={() => setCurrentTab('dashboard')}
//               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
//                 currentTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
//               }`}
//             >
//               <LayoutDashboard size={18} />
//               <span>Dashboard</span>
//             </button>
//             <button 
//               onClick={() => setCurrentTab('users')}
//               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
//                 currentTab === 'users' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
//               }`}
//             >
//               <Users size={18} />
//               <span>Users</span>
//             </button>
//             <button 
//               onClick={() => setCurrentTab('categories')}
//               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
//                 currentTab === 'categories' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
//               }`}
//             >
//               <Tag size={18} />
//               <span>Categories</span>
//             </button>
//             <button 
//               onClick={() => setCurrentTab('reports')}
//               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
//                 currentTab === 'reports' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
//               }`}
//             >
//               <AlertTriangle size={18} />
//               <span>Reports & Moderation</span>
//             </button>
//           </nav>
//         </div>

//         <div className="border-t border-white/10 pt-4">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 rounded-full bg-brandSky/20 flex items-center justify-center font-bold text-brandSky">
//               {adminUser.name ? adminUser.name[0] : 'A'}
//             </div>
//             <div>
//               <h4 className="font-bold text-sm">{adminUser.name || 'Super Admin'}</h4>
//               <span className="text-[10px] text-brandPink font-semibold uppercase">System Administrator</span>
//             </div>
//           </div>
//           <button 
//             onClick={handleLogout}
//             className="w-full py-2.5 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-xl font-semibold text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
//           >
//             <LogOut size={14} />
//             <span>Log Out</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 p-10 overflow-y-auto space-y-8">
//         <header className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-black text-brandNavy capitalize">{currentTab} Overview</h1>
//             <p className="text-xs text-slate-500 mt-0.5">Manage campus marketplace activity, student verification, and listings.</p>
//           </div>
//           <button 
//             onClick={() => onNavigate('browse')}
//             className="px-4 py-2 bg-white border border-slate-200 text-brandNavy font-semibold rounded-xl text-sm shadow-sm hover:bg-slate-50 transition cursor-pointer"
//           >
//             View Live Marketplace ➔
//           </button>
//         </header>

//         {/* Dashboard Tab */}
//         {currentTab === 'dashboard' && (
//           <div className="space-y-8">
//             {/* Metric Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
//                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
//                 <div className="text-4xl font-black text-brandNavy mt-2">{stats.users}</div>
//                 <span className="text-xs text-green-600 font-medium mt-1 inline-block">● Verified PRN Students</span>
//               </div>
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
//                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Listings</span>
//                 <div className="text-4xl font-black text-brandPink mt-2">{stats.listings}</div>
//                 <span className="text-xs text-slate-500 font-medium mt-1 inline-block">Across all campus categories</span>
//               </div>
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
//                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reports Pending</span>
//                 <div className="text-4xl font-black text-amber-600 mt-2">{flaggedListings.length}</div>
//                 <span className="text-xs text-amber-600 font-medium mt-1 inline-block">Requires moderation action</span>
//               </div>
//             </div>

//             {/* Flagged Listings Moderation Section (Matching Mockup) */}
//             <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-black text-brandNavy flex items-center space-x-2">
//                   <AlertTriangle size={20} className="text-amber-500" />
//                   <span>Flagged Listings Moderation</span>
//                 </h3>
//               </div>

//               {flaggedListings.length === 0 ? (
//                 <div className="p-8 text-center text-slate-400 font-medium text-sm">No pending flagged listings to review. Everything looks great!</div>
//               ) : (
//                 <div className="space-y-4">
//                   {flaggedListings.map((item) => (
//                     <div key={item.listing_id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
//                       <div>
//                         <h4 className="font-bold text-brandNavy text-sm">{item.title}</h4>
//                         <p className="text-xs text-slate-500 mt-0.5">Reported by: <span className="font-semibold text-slate-700">{item.reporter || 'Student User'}</span></p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button 
//                           onClick={() => handleModerateListing(item.listing_id, 'approve')}
//                           className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl text-xs hover:bg-green-200 transition flex items-center space-x-1 cursor-pointer"
//                         >
//                           <CheckCircle size={14} />
//                           <span>Approve</span>
//                         </button>
//                         <button 
//                           onClick={() => handleModerateListing(item.listing_id, 'remove')}
//                           className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-xl text-xs hover:bg-red-200 transition flex items-center space-x-1 cursor-pointer"
//                         >
//                           <XCircle size={14} />
//                           <span>Remove</span>
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Users Tab */}
//         {currentTab === 'users' && (
//           <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
//             <h3 className="text-lg font-black text-brandNavy">Registered College Students</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-slate-200 text-xs text-slate-400 uppercase">
//                     <th className="pb-3">PRN</th>
//                     <th className="pb-3">Name</th>
//                     <th className="pb-3">College Email</th>
//                     <th className="pb-3">Department</th>
//                     <th className="pb-3">Year</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   {allUsers.map((u) => (
//                     <tr key={u.prn} className="hover:bg-slate-50">
//                       <td className="py-3 font-semibold text-brandNavy">{u.prn}</td>
//                       <td className="py-3 font-medium">{u.name}</td>
//                       <td className="py-3 text-slate-500">{u.email}</td>
//                       <td className="py-3">{u.department || 'General'}</td>
//                       <td className="py-3">Year {u.year}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Categories Tab */}
//         {currentTab === 'categories' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
//               <h3 className="text-lg font-black text-brandNavy">Add New Category</h3>
//               <form onSubmit={handleAddCategory} className="space-y-4">
//                 <div>
//                   <label className="text-xs font-semibold text-slate-600 uppercase">Category Name</label>
//                   <input 
//                     type="text" 
//                     placeholder="e.g., Lab Equipment, Electronics..." 
//                     value={newCategoryName}
//                     onChange={(e) => setNewCategoryName(e.target.value)}
//                     className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brandSky"
//                   />
//                 </div>
//                 <button type="submit" className="w-full py-3 bg-brandNavy text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition cursor-pointer">
//                   Create Category
//                 </button>
//               </form>
//             </div>

//             <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
//               <h3 className="text-lg font-black text-brandNavy">Existing Categories</h3>
//               <div className="space-y-2">
//                 {categories.map((cat) => (
//                   <div key={cat.category_id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between font-semibold text-sm">
//                     <span>{cat.name}</span>
//                     <span className="text-xs text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200">ID: {cat.category_id}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reports Tab */}
//         {currentTab === 'reports' && (
//           <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
//             <h3 className="text-lg font-black text-brandNavy">Dispute & Flagged Item Reports</h3>
//             <p className="text-xs text-slate-500">Review flagged items reported by campus students for inappropriate content or pricing violations.</p>
//             {flaggedListings.map((item) => (
//               <div key={item.listing_id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
//                 <div>
//                   <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">Flagged Item</span>
//                   <h4 className="font-bold text-brandNavy text-base mt-1.5">{item.title}</h4>
//                   <p className="text-xs text-slate-500 mt-1">Reported by student: <strong>{item.reporter}</strong></p>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <button onClick={() => handleModerateListing(item.listing_id, 'approve')} className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl text-xs cursor-pointer">
//                     Dismiss Report
//                   </button>
//                   <button onClick={() => handleModerateListing(item.listing_id, 'remove')} className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs cursor-pointer">
//                     Delete Listing
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Tag, AlertTriangle, CheckCircle, XCircle, LogOut, TrendingUp, Trophy, Flame } from 'lucide-react';

export default function AdminPanel({ onNavigate }) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    activeListings: 0,
    totalSold: 0,
    totalVolume: '₹0',
    categoryData: [],
    topUsers: []
  });
  const [flaggedListings, setFlaggedListings] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  const adminUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchLiveAnalytics();
    fetchFlaggedListings();
    fetchUsers();
    fetchCategories();
  }, []);

  const fetchLiveAnalytics = () => {
    fetch('http://localhost:5000/api/admin/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err => console.error('Failed to fetch analytics:', err));
  };

  const fetchFlaggedListings = () => {
    fetch('http://localhost:5000/api/admin/flagged-listings')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setFlaggedListings(data))
      .catch(() => setFlaggedListings([]));
  };

  const fetchUsers = () => {
    fetch('http://localhost:5000/api/admin/users')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setAllUsers(data))
      .catch(() => {});
  };

  const fetchCategories = () => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setCategories(data))
      .catch(() => {});
  };

  const handleModerateListing = async (listingId, action) => {
    try {
      await fetch(`http://localhost:5000/api/admin/listings/${listingId}/moderate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      fetchFlaggedListings();
      fetchLiveAnalytics();
    } catch (err) {
      console.error('Moderation error:', err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      await fetch('http://localhost:5000/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName })
      });
      setNewCategoryName('');
      fetchCategories();
      fetchLiveAnalytics();
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onNavigate('landing');
  };

  // Color options for category bars
  const barColors = ['bg-brandNavy', 'bg-brandSky', 'bg-brandPink', 'bg-indigo-500', 'bg-amber-500', 'bg-emerald-500'];

  return (
    <div className="min-h-screen bg-brandCream flex text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-brandNavy text-white flex flex-col justify-between p-6 shrink-0 shadow-lg">
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-brandPink flex items-center justify-center text-brandNavy font-bold text-lg">⇄</div>
            <span className="text-2xl font-black tracking-tight">GiveNTake</span>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setCurrentTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
                currentTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard & Analytics</span>
            </button>
            <button 
              onClick={() => setCurrentTab('users')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
                currentTab === 'users' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Users size={18} />
              <span>Users</span>
            </button>
            <button 
              onClick={() => setCurrentTab('categories')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
                currentTab === 'categories' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Tag size={18} />
              <span>Categories</span>
            </button>
            <button 
              onClick={() => setCurrentTab('reports')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
                currentTab === 'reports' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <AlertTriangle size={18} />
              <span>Reports & Moderation</span>
            </button>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brandSky/20 flex items-center justify-center font-bold text-brandSky">
              {adminUser.name ? adminUser.name[0] : 'A'}
            </div>
            <div>
              <h4 className="font-bold text-sm">{adminUser.name || 'Super Admin'}</h4>
              <span className="text-[10px] text-brandPink font-semibold uppercase">System Administrator</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full py-2.5 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-xl font-semibold text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-brandNavy capitalize">{currentTab} Overview</h1>
            <p className="text-xs text-slate-500 mt-0.5">Live database statistics, demand trends, and platform moderation.</p>
          </div>
          <button 
            onClick={() => onNavigate('browse')}
            className="px-4 py-2 bg-white border border-slate-200 text-brandNavy font-semibold rounded-xl text-sm shadow-sm hover:bg-slate-50 transition cursor-pointer"
          >
            View Live Marketplace ➔
          </button>
        </header>

        {/* Dashboard Tab */}
        {currentTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Registered Students</span>
                <div className="text-3xl font-black text-brandNavy mt-2">{analytics.totalUsers}</div>
                <span className="text-xs text-green-600 font-medium mt-1 block">● PRN Database Verified</span>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Listings</span>
                <div className="text-3xl font-black text-brandNavy mt-2">{analytics.activeListings}</div>
                <span className="text-xs text-slate-500 font-medium mt-1 block">Live gear offers</span>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Successful Items Sold</span>
                <div className="text-3xl font-black text-brandPink mt-2">{analytics.totalSold}</div>
                <span className="text-xs text-brandPink font-bold mt-1 block flex items-center gap-1">
                  <TrendingUp size={12} /> Completed campus trades
                </span>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Trade Value</span>
                <div className="text-3xl font-black text-emerald-600 mt-2">{analytics.totalVolume}</div>
                <span className="text-xs text-slate-500 font-medium mt-1 block">Recorded in database</span>
              </div>
            </div>

            {/* Analytical Charts Section (Powered by Database) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Category Demand & Most Sold Chart */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-brandNavy flex items-center space-x-2">
                      <TrendingUp size={20} className="text-brandPink" />
                      <span>Live Category Demand & Sales</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Real-time breakdown of listings and sales across database categories</p>
                  </div>
                </div>

                {analytics.categoryData.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No category data found in database.</p>
                ) : (
                  <div className="space-y-5 pt-2">
                    {analytics.categoryData.map((cat, idx) => {
                      const maxListings = Math.max(...analytics.categoryData.map(c => c.total_listings), 1);
                      const percentage = Math.round((cat.total_listings / maxListings) * 100);
                      return (
                        <div key={cat.category_name} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>{cat.category_name}</span>
                            <span className="text-slate-500">{cat.sold_count} Sold / {cat.total_listings} Listed</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${barColors[idx % barColors.length]} transition-all duration-500`} 
                              style={{ width: `${Math.max(percentage, 10)}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Most Active Users Leaderboard (From Database) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-brandNavy flex items-center space-x-2">
                    <Trophy size={20} className="text-amber-500" />
                    <span>Most Active Campus Sellers</span>
                  </h3>
                </div>

                {analytics.topUsers.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No user activity recorded yet.</p>
                ) : (
                  <div className="space-y-4">
                    {analytics.topUsers.map((user, index) => (
                      <div key={user.prn} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                        <div className="flex items-center space-x-3">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                            index === 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
                          }`}>
                            #{index + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-brandNavy text-sm">{user.name}</h4>
                            <span className="text-[11px] text-slate-400">{user.department || 'General'} • {user.prn}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-brandNavy block">{user.listingsCount || 0} Posts</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">{user.soldCount || 0} Sold</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Flagged Listings Moderation Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-lg font-black text-brandNavy flex items-center space-x-2">
                <AlertTriangle size={20} className="text-amber-500" />
                <span>Flagged Listings Moderation</span>
              </h3>

              {flaggedListings.length === 0 ? (
                <div className="p-8 text-center text-slate-400 font-medium text-sm">No pending flagged listings to review.</div>
              ) : (
                <div className="space-y-4">
                  {flaggedListings.map((item) => (
                    <div key={item.listing_id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                      <div>
                        <h4 className="font-bold text-brandNavy text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Status: <span className="font-semibold text-slate-700">{item.status}</span></p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleModerateListing(item.listing_id, 'approve')}
                          className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl text-xs hover:bg-green-200 transition cursor-pointer flex items-center space-x-1"
                        >
                          <CheckCircle size={14} />
                          <span>Approve</span>
                        </button>
                        <button 
                          onClick={() => handleModerateListing(item.listing_id, 'remove')}
                          className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-xl text-xs hover:bg-red-200 transition flex items-center space-x-1 cursor-pointer"
                        >
                          <XCircle size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {currentTab === 'users' && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-lg font-black text-brandNavy">Registered College Students</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-400 uppercase">
                    <th className="pb-3">PRN</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">College Email</th>
                    <th className="pb-3">Department</th>
                    <th className="pb-3">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allUsers.map((u) => (
                    <tr key={u.prn} className="hover:bg-slate-50">
                      <td className="py-3 font-semibold text-brandNavy">{u.prn}</td>
                      <td className="py-3 font-medium">{u.name}</td>
                      <td className="py-3 text-slate-500">{u.email}</td>
                      <td className="py-3">{u.department || 'General'}</td>
                      <td className="py-3">Year {u.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {currentTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-lg font-black text-brandNavy">Add New Category</h3>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase">Category Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Lab Equipment, Electronics..." 
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brandSky"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-brandNavy text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition cursor-pointer">
                  Create Category
                </button>
              </form>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-lg font-black text-brandNavy">Existing Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.category_id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between font-semibold text-sm">
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200">ID: {cat.category_id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {currentTab === 'reports' && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-lg font-black text-brandNavy">Dispute & Flagged Item Reports</h3>
            <p className="text-xs text-slate-500">Review flagged items reported by campus students.</p>
            {flaggedListings.map((item) => (
              <div key={item.listing_id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">Flagged Item</span>
                  <h4 className="font-bold text-brandNavy text-base mt-1.5">{item.title}</h4>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => handleModerateListing(item.listing_id, 'approve')} className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl text-xs cursor-pointer">
                    Dismiss Report
                  </button>
                  <button onClick={() => handleModerateListing(item.listing_id, 'remove')} className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs cursor-pointer">
                    Delete Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}