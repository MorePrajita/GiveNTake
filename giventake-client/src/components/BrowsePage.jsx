// import React, { useState, useEffect } from 'react';
// import { Search, Heart, User, PlusCircle, MessageSquare } from 'lucide-react';

// export default function BrowsePage({ onNavigate }) {
//   const [listings, setListings] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   useEffect(() => {
//     fetch('http://localhost:5000/api/categories')
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) setCategories(data);
//         else setCategories([]);
//       })
//       .catch(err => setCategories([]));

//     fetchListings();
//   }, [selectedCategory]);

//   const fetchListings = (query = '') => {
//     let url = 'http://localhost:5000/api/listings?';
//     if (selectedCategory) url += `category_id=${selectedCategory}&`;
//     if (query) url += `search=${query}`;

//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) setListings(data);
//         else setListings([]);
//       })
//       .catch(err => setListings([]));
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     fetchListings(searchQuery);
//   };

//   return (
//     <div className="min-h-screen bg-brandCream flex flex-col text-slate-800">
//       {/* Navbar */}
//       <nav className="w-full px-8 py-4 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
//         <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('landing')}>
//           <div className="w-9 h-9 rounded-xl bg-brandNavy flex items-center justify-center text-white font-bold text-lg">⇄</div>
//           <span className="text-2xl font-black text-brandNavy tracking-tight">GiveNTake</span>
//         </div>

//         {/* Search Bar */}
//         <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-xl mx-8 relative">
//           <span className="absolute left-3 text-slate-400"><Search size={18} /></span>
//           <input 
//             type="text" 
//             placeholder="Search for books, cycles, lab equipment..." 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//           />
//         </form>

//         <div className="flex items-center space-x-4">
//           <button 
//             onClick={() => onNavigate('create-listing')} 
//             className="px-4 py-2.5 bg-brandNavy text-white font-semibold rounded-xl shadow-md hover:bg-slate-800 transition flex items-center space-x-1.5 text-sm cursor-pointer"
//           >
//             <PlusCircle size={16} />
//             <span>Sell</span>
//           </button>
          
//           {/* User Profile Avatar Link */}
//           <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
//             <button
//               onClick={() => onNavigate('profile')}
//               title="View Profile & Managed Listings"
//               className="w-9 h-9 bg-brandSky/30 hover:bg-brandSky/50 text-brandNavy rounded-full flex items-center justify-center font-bold text-sm transition cursor-pointer border border-brandSky/40"
//             >
//               {user.name ? user.name[0].toUpperCase() : <User size={18} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content Feed */}
//       <main className="w-full px-8 lg:px-16 py-8 flex-1 max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h2 className="text-lg font-bold text-brandNavy mb-4">Explore Categories</h2>
//           <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
//             <button 
//               onClick={() => setSelectedCategory('')}
//               className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition shadow-sm cursor-pointer ${
//                 selectedCategory === '' ? 'bg-brandNavy text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
//               }`}
//             >
//               All Items
//             </button>
//             {categories.map((cat) => (
//               <button 
//                 key={cat.category_id}
//                 onClick={() => setSelectedCategory(cat.category_id)}
//                 className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition shadow-sm cursor-pointer ${
//                   selectedCategory === cat.category_id ? 'bg-brandNavy text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
//                 }`}
//               >
//                 {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         <h2 className="text-xl font-black text-brandNavy mb-6">Fresh Listings Near You</h2>
        
//         {listings.length === 0 ? (
//           <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
//             <p className="text-slate-500 font-medium">No active listings found in this category right now.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {listings.map((item) => (
//               <div 
//                 key={item.listing_id}
//                 onClick={() => onNavigate('listing-detail', item.listing_id)}
//                 className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-slate-200 cursor-pointer flex flex-col"
//               >
//                 <div className="h-48 bg-slate-100 relative flex items-center justify-center text-slate-400">
//                   {item.photo_url ? (
//                     <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover" />
//                   ) : (
//                     <span>No Photo</span>
//                   )}
//                   <span className="absolute bottom-3 left-3 bg-brandNavy/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
//                     {item.item_condition}
//                   </span>
//                 </div>

//                 <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
//                   <div>
//                     <div className="text-brandPink font-black text-lg">₹{item.price}</div>
//                     <h3 className="font-bold text-slate-800 text-sm line-clamp-1 mt-0.5">{item.title}</h3>
//                   </div>
//                   <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
//                     <span>{item.seller_dept} Dept</span>
//                     <span>{new Date(item.created_at).toLocaleDateString()}</span>
//                   </div>
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
import { Search, Heart, User, PlusCircle } from 'lucide-react';

export default function BrowsePage({ onNavigate }) {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState([]);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setCategories(data))
      .catch(() => setCategories([]));

    fetchListings();

    if (user.prn) {
      fetchWishlistIds();
    }
  }, [selectedCategory]);

  const fetchWishlistIds = () => {
    fetch(`http://localhost:5000/api/wishlist/${user.prn}/ids`)
      .then(res => res.json())
      .then(data => Array.isArray(data) && setSavedIds(data))
      .catch(err => console.error(err));
  };

  const fetchListings = (query = '') => {
    let url = 'http://localhost:5000/api/listings?';
    if (selectedCategory) url += `category_id=${selectedCategory}&`;
    if (query) url += `search=${query}`;

    fetch(url)
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setListings(data) : setListings([]))
      .catch(() => setListings([]));
  };

  const handleToggleWishlist = async (e, listingId) => {
    e.stopPropagation();
    if (!user.prn) {
      alert('Please sign in to save items.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/wishlist/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_prn: user.prn, listing_id: listingId })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.saved) {
          setSavedIds([...savedIds, listingId]);
        } else {
          setSavedIds(savedIds.filter(id => id !== listingId));
        }
      }
    } catch (err) {
      console.error('Wishlist toggle error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-brandCream flex flex-col text-slate-800">
      <nav className="w-full px-8 py-4 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-9 h-9 rounded-xl bg-brandNavy flex items-center justify-center text-white font-bold text-lg">⇄</div>
          <span className="text-2xl font-black text-brandNavy tracking-tight">GiveNTake</span>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); fetchListings(searchQuery); }} className="hidden md:flex items-center flex-1 max-w-xl mx-8 relative">
          <span className="absolute left-3 text-slate-400"><Search size={18} /></span>
          <input 
            type="text" 
            placeholder="Search for books, cycles, lab equipment..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
          />
        </form>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onNavigate('create-listing')} 
            className="px-4 py-2.5 bg-brandNavy text-white font-semibold rounded-xl shadow-md hover:bg-slate-800 transition flex items-center space-x-1.5 text-sm cursor-pointer"
          >
            <PlusCircle size={16} />
            <span>Sell</span>
          </button>
          
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
            <button
              onClick={() => onNavigate('profile')}
              title="Saved Wishlist Items"
              className="p-2 text-slate-600 hover:text-brandPink hover:bg-slate-100 rounded-full transition cursor-pointer relative"
            >
              <Heart size={20} className={savedIds.length > 0 ? "fill-brandPink text-brandPink" : ""} />
              {savedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brandPink text-brandNavy text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('profile')}
              title="View Profile & Managed Listings"
              className="w-9 h-9 bg-brandSky/30 hover:bg-brandSky/50 text-brandNavy rounded-full flex items-center justify-center font-bold text-sm transition cursor-pointer border border-brandSky/40"
            >
              {user.name ? user.name[0].toUpperCase() : <User size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="w-full px-8 lg:px-16 py-8 flex-1 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-brandNavy mb-4">Explore Categories</h2>
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
            <button 
              onClick={() => setSelectedCategory('')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition shadow-sm cursor-pointer ${
                selectedCategory === '' ? 'bg-brandNavy text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button 
                key={cat.category_id}
                onClick={() => setSelectedCategory(cat.category_id)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition shadow-sm cursor-pointer ${
                  selectedCategory === cat.category_id ? 'bg-brandNavy text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-black text-brandNavy mb-6">Fresh Listings Near You</h2>
        
        {listings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 font-medium">No active listings found in this category right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((item) => {
              const isSaved = savedIds.includes(item.listing_id);
              return (
                <div 
                  key={item.listing_id}
                  onClick={() => onNavigate('listing-detail', item.listing_id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-slate-200 cursor-pointer flex flex-col group relative"
                >
                  <div className="h-48 bg-slate-100 relative flex items-center justify-center text-slate-400">
                    {item.photo_url ? (
                      <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <span>No Photo</span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-brandNavy/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {item.item_condition}
                    </span>

                    {/* Bookmark Heart Toggle */}
                    <button
                      onClick={(e) => handleToggleWishlist(e, item.listing_id)}
                      className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-sm transition"
                    >
                      <Heart size={16} className={isSaved ? "fill-brandPink text-brandPink" : "text-slate-600 hover:text-brandPink"} />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-brandPink font-black text-lg">₹{item.price}</div>
                      <h3 className="font-bold text-slate-800 text-sm line-clamp-1 mt-0.5">{item.title}</h3>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span>{item.seller_dept} Dept</span>
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}