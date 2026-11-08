// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, ShieldCheck, Heart, Trash2, User, LogOut,MessageSquare } from 'lucide-react';

// export default function UserProfile({ onNavigate }) {
//   const [userListings, setUserListings] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [activeTab, setActiveTab] = useState('active'); // 'active', 'wishlist', or 'sold'
//   const [loading, setLoading] = useState(true);

//   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

//   useEffect(() => {
//     if (currentUser.prn) {
//       fetchUserListings();
//       fetchWishlistItems();
//     } else {
//       setLoading(false);
//     }
//   }, [currentUser.prn]);

//   const fetchUserListings = () => {
//     fetch(`http://localhost:5000/api/users/${currentUser.prn}/listings`)
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) setUserListings(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   };

//   const fetchWishlistItems = () => {
//     fetch(`http://localhost:5000/api/wishlist/${currentUser.prn}`)
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) setWishlistItems(data);
//         else setWishlistItems([]);
//       })
//       .catch(err => {
//         console.error('Failed to load wishlist:', err);
//         setWishlistItems([]);
//       });
//   };

//   const handleMarkAsSold = async (listingId) => {
//     if (!window.confirm('Mark this item as Sold?')) return;
//     await fetch(`http://localhost:5000/api/listings/${listingId}/status`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: 'sold' })
//     });
//     fetchUserListings();
//   };

//   const handleDeleteListing = async (listingId) => {
//     if (!window.confirm('Delete this listing permanently?')) return;
//     await fetch(`http://localhost:5000/api/listings/${listingId}`, { method: 'DELETE' });
//     fetchUserListings();
//   };

//   const handleRemoveWishlist = async (listingId) => {
//     await fetch('http://localhost:5000/api/wishlist/toggle', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ user_prn: currentUser.prn, listing_id: listingId })
//     });
//     fetchWishlistItems();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     onNavigate('landing');
//   };

//   const activeCount = userListings.filter(i => i.status === 'active').length;
//   const soldCount = userListings.filter(i => i.status === 'sold').length;

//   return (
//     <div className="min-h-screen bg-brandCream flex flex-col text-slate-800">
//       <nav className="w-full px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-50 shadow-sm">
//         <button onClick={() => onNavigate('browse')} className="flex items-center space-x-2 text-brandNavy font-semibold hover:underline cursor-pointer">
//           <ArrowLeft size={18} />
//           <span>Back to Marketplace</span>
//         </button>
//         <span className="font-black text-brandNavy text-xl">My Student Profile</span>
//         <button onClick={handleLogout} className="flex items-center space-x-1.5 text-red-600 font-semibold text-sm hover:underline cursor-pointer">
//           <LogOut size={16} />
//           <span>Log Out</span>
//         </button>
//       </nav>

//       <main className="max-w-5xl mx-auto w-full px-6 py-10 space-y-8">
//         <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//           <div className="flex items-center space-x-4">
//             <div className="w-16 h-16 bg-brandSky/30 text-brandNavy rounded-2xl flex items-center justify-center font-black text-2xl">
//               {currentUser.name ? currentUser.name[0].toUpperCase() : <User size={30} />}
//             </div>
//             <div>
//               <div className="flex items-center space-x-2">
//                 <h1 className="text-2xl font-black text-brandNavy">{currentUser.name}</h1>
//                 <span className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
//                   <ShieldCheck size={14} />
//                   <span>PRN Verified</span>
//                 </span>
//               </div>
//               <p className="text-sm text-slate-500 mt-1">
//                 PRN: <strong>{currentUser.prn}</strong> • {currentUser.department} Dept • Year {currentUser.year}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 w-full md:w-auto justify-around">
//             <div className="text-center px-4">
//               <span className="text-2xl font-black text-brandNavy">{activeCount}</span>
//               <p className="text-xs text-slate-500 font-medium uppercase">Active Posts</p>
//             </div>
//             <div className="h-8 w-px bg-slate-200"></div>
//             <div className="text-center px-4">
//               <span className="text-2xl font-black text-brandPink">{wishlistItems.length}</span>
//               <p className="text-xs text-slate-500 font-medium uppercase">Saved Items</p>
//             </div>
//           </div>
//         </div>

//         {/* Tab Filters */}
//         <div className="space-y-6">
//           <div className="flex items-center justify-between border-b border-slate-200 pb-4">
//             <div className="flex items-center space-x-3 overflow-x-auto">
//               <button 
//                 onClick={() => setActiveTab('active')}
//                 className={`px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
//                   activeTab === 'active' ? 'bg-brandNavy text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
//                 }`}
//               >
//                 Active Listings ({activeCount})
//               </button>
//               <button 
//                 onClick={() => setActiveTab('wishlist')}
//                 className={`px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer flex items-center space-x-1.5 ${
//                   activeTab === 'wishlist' ? 'bg-brandNavy text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
//                 }`}
//               >
//                 <Heart size={14} className={activeTab === 'wishlist' ? 'fill-brandPink text-brandPink' : ''} />
//                 <span>Saved Items ({wishlistItems.length})</span>
//               </button>
//               <button 
//                 onClick={() => setActiveTab('sold')}
//                 className={`px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
//                   activeTab === 'sold' ? 'bg-brandNavy text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
//                 }`}
//               >
//                 Sold History ({soldCount})
//               </button>
//             </div>

//             <button 
//               onClick={() => onNavigate('create-listing')}
//               className="px-4 py-2 bg-brandPink text-brandNavy font-bold rounded-xl text-sm shadow-sm hover:opacity-90 transition cursor-pointer"
//             >
//               + Post New Item
//             </button>
//           </div>

//           {/* Tab Contents */}
//           {activeTab === 'wishlist' ? (
//             wishlistItems.length === 0 ? (
//               <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
//                 <p className="text-slate-500 font-medium">Your saved wishlist is empty. Tap the heart on listings to save them!</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {wishlistItems.map((item) => (
//                   <div key={item.listing_id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between">
//                     <div className="relative h-44 bg-slate-100 flex items-center justify-center">
//                       {item.photo_url ? (
//                         <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover" />
//                       ) : (
//                         <span className="text-slate-400 font-medium text-xs">No Photo</span>
//                       )}
//                       <button 
//                         onClick={() => handleRemoveWishlist(item.listing_id)}
//                         className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm text-brandPink cursor-pointer"
//                         title="Remove from saved"
//                       >
//                         <Heart size={16} className="fill-brandPink" />
//                       </button>
//                     </div>
//                     <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
//                       <div>
//                         <div className="text-brandPink font-black text-lg">₹{item.price}</div>
//                         <h3 className="font-bold text-slate-800 text-base line-clamp-1">{item.title}</h3>
//                         <p className="text-xs text-slate-500 line-clamp-1 mt-1">Seller: {item.seller_name} ({item.seller_dept})</p>
//                       </div>
//                       <button 
//                         onClick={() => onNavigate('listing-detail', item.listing_id)}
//                         className="w-full py-2 bg-brandNavy text-white font-semibold rounded-xl text-xs hover:bg-slate-800 transition cursor-pointer"
//                       >
//                         View Item Details
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )
//           ) : (
//             userListings.filter(i => activeTab === 'active' ? i.status === 'active' : i.status === 'sold').length === 0 ? (
//               <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
//                 <p className="text-slate-500 font-medium">No items found in this tab.</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {userListings
//                   .filter(i => activeTab === 'active' ? i.status === 'active' : i.status === 'sold')
//                   .map((item) => (
//                     <div key={item.listing_id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between">
//                       <div className="relative h-44 bg-slate-100 flex items-center justify-center">
//                         {item.photo_url ? (
//                           <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover" />
//                         ) : (
//                           <span className="text-slate-400 text-xs">No Photo</span>
//                         )}
//                       </div>
//                       <div className="p-5 space-y-3">
//                         <div className="text-brandPink font-black text-lg">₹{item.price}</div>
//                         <h3 className="font-bold text-slate-800 text-base line-clamp-1">{item.title}</h3>
//                         {activeTab === 'active' && (
//                           <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
//                             <button onClick={() => handleMarkAsSold(item.listing_id)} className="flex-1 py-2 bg-green-100 text-green-700 font-semibold rounded-xl text-xs cursor-pointer">
//                               Mark Sold
//                             </button>
//                             <button onClick={() => handleDeleteListing(item.listing_id)} className="p-2 text-slate-400 hover:text-red-600 cursor-pointer">
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             )
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Heart, Trash2, User, LogOut, MessageSquare } from 'lucide-react';

export default function UserProfile({ onNavigate }) {
  const [userListings, setUserListings] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'wishlist', or 'sold'
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (currentUser.prn) {
      fetchUserListings();
      fetchWishlistItems();
    } else {
      setLoading(false);
    }
  }, [currentUser.prn]);

  const fetchUserListings = () => {
    fetch(`http://localhost:5000/api/users/${currentUser.prn}/listings`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUserListings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchWishlistItems = () => {
    fetch(`http://localhost:5000/api/wishlist/${currentUser.prn}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setWishlistItems(data);
        else setWishlistItems([]);
      })
      .catch(err => {
        console.error('Failed to load wishlist:', err);
        setWishlistItems([]);
      });
  };

  const handleMarkAsSold = async (listingId) => {
    if (!window.confirm('Mark this item as Sold?')) return;
    await fetch(`http://localhost:5000/api/listings/${listingId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'sold' })
    });
    fetchUserListings();
  };

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm('Delete this listing permanently?')) return;
    await fetch(`http://localhost:5000/api/listings/${listingId}`, { method: 'DELETE' });
    fetchUserListings();
  };

  const handleRemoveWishlist = async (listingId) => {
    await fetch('http://localhost:5000/api/wishlist/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_prn: currentUser.prn, listing_id: listingId })
    });
    fetchWishlistItems();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onNavigate('landing');
  };

  const activeCount = userListings.filter(i => i.status === 'active').length;
  const soldCount = userListings.filter(i => i.status === 'sold').length;

  return (
    <div className="min-h-screen bg-brandCream flex flex-col text-slate-800">
      <nav className="w-full px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button onClick={() => onNavigate('browse')} className="flex items-center space-x-2 text-brandNavy font-semibold hover:underline cursor-pointer">
          <ArrowLeft size={18} />
          <span>Back to Marketplace</span>
        </button>
        <span className="font-black text-brandNavy text-xl">My Student Profile</span>
        <button onClick={handleLogout} className="flex items-center space-x-1.5 text-red-600 font-semibold text-sm hover:underline cursor-pointer">
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </nav>

      <main className="max-w-5xl mx-auto w-full px-6 py-10 space-y-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-brandSky/30 text-brandNavy rounded-2xl flex items-center justify-center font-black text-2xl">
              {currentUser.name ? currentUser.name[0].toUpperCase() : <User size={30} />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-brandNavy">{currentUser.name}</h1>
                <span className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
                  <ShieldCheck size={14} />
                  <span>PRN Verified</span>
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                PRN: <strong>{currentUser.prn}</strong> | {currentUser.department} Dept • Year {currentUser.year}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 w-full md:w-auto justify-around">
            <div className="text-center px-4">
              <span className="text-2xl font-black text-brandNavy">{activeCount}</span>
              <p className="text-xs text-slate-500 font-medium uppercase">Active Posts</p>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="text-center px-4">
              <span className="text-2xl font-black text-brandPink">{wishlistItems.length}</span>
              <p className="text-xs text-slate-500 font-medium uppercase">Saved Items</p>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-3 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('active')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
                  activeTab === 'active' ? 'bg-brandNavy text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Active Listings ({activeCount})
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === 'wishlist' ? 'bg-brandNavy text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Heart size={14} className={activeTab === 'wishlist' ? 'fill-brandPink text-brandPink' : ''} />
                <span>Saved Items ({wishlistItems.length})</span>
              </button>
              <button 
                onClick={() => setActiveTab('sold')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
                  activeTab === 'sold' ? 'bg-brandNavy text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Sold History ({soldCount})
              </button>
            </div>

            <button 
              onClick={() => onNavigate('create-listing')}
              className="px-4 py-2 bg-brandPink text-brandNavy font-bold rounded-xl text-sm shadow-sm hover:opacity-90 transition cursor-pointer"
            >
              + Post New Item
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === 'wishlist' ? (
            wishlistItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-slate-500 font-medium">Your saved wishlist is empty. Tap the heart on listings to save them!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.listing_id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between">
                    <div className="relative h-44 bg-slate-100 flex items-center justify-center">
                      {item.photo_url ? (
                        <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-slate-400 font-medium text-xs">No Photo</span>
                      )}
                      <button 
                        onClick={() => handleRemoveWishlist(item.listing_id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm text-brandPink cursor-pointer"
                        title="Remove from saved"
                      >
                        <Heart size={16} className="fill-brandPink" />
                      </button>
                    </div>
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-brandPink font-black text-lg">₹{item.price}</div>
                        <h3 className="font-bold text-slate-800 text-base line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-1">Seller: {item.seller_name} ({item.seller_dept})</p>
                      </div>
                      <button 
                        onClick={() => onNavigate('listing-detail', item.listing_id)}
                        className="w-full py-2 bg-brandNavy text-white font-semibold rounded-xl text-xs hover:bg-slate-800 transition cursor-pointer"
                      >
                        View Item Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            userListings.filter(i => activeTab === 'active' ? i.status === 'active' : i.status === 'sold').length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-slate-500 font-medium">No items found in this tab.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings
                  .filter(i => activeTab === 'active' ? i.status === 'active' : i.status === 'sold')
                  .map((item) => (
                    <div key={item.listing_id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between">
                      <div className="relative h-44 bg-slate-100 flex items-center justify-center">
                        {item.photo_url ? (
                          <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-slate-400 text-xs">No Photo</span>
                        )}
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="text-brandPink font-black text-lg">₹{item.price}</div>
                        <h3 className="font-bold text-slate-800 text-base line-clamp-1">{item.title}</h3>
                        {activeTab === 'active' && (
                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <button 
                              onClick={() => onNavigate('listing-detail', item.listing_id)}
                              className="flex-1 py-2 bg-brandSky/20 text-brandNavy font-semibold rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer hover:bg-brandSky/30 transition"
                            >
                              <MessageSquare size={14} />
                              <span>Open Inquiries</span>
                            </button>
                            <button onClick={() => handleMarkAsSold(item.listing_id)} className="px-3 py-2 bg-green-100 text-green-700 font-semibold rounded-xl text-xs cursor-pointer">
                              Mark Sold
                            </button>
                            <button onClick={() => handleDeleteListing(item.listing_id)} className="p-2 text-slate-400 hover:text-red-600 cursor-pointer">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}