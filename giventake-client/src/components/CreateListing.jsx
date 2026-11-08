// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, Sparkles, MapPin } from 'lucide-react';

// export default function CreateListing({ onNavigate }) {
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     category_id: '',
//     description: '',
//     original_price: '',
//     price: '',
//     item_condition: 'Good',
//     photo_url: '',
//     meetup_location: 'Main Library'
//   });
//   const [suggestedPrice, setSuggestedPrice] = useState(null);
//   const [error, setError] = useState('');

//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const campusLocations = [
//     'Main Library',
//     'Central Canteen',
//     'Computer Lab Block',
//     'Main Gate / Security Desk',
//     'Sports Complex & Ground',
//     'Hostel Premises'
//   ];

//   useEffect(() => {
//     fetch('http://localhost:5000/api/categories')
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) setCategories(data);
//       })
//       .catch(err => console.error('Failed to fetch categories:', err));
//   }, []);

//   // Fair Price Suggestion Calculation
//   const calculateFairPrice = (origPrice, condition) => {
//     const orig = parseFloat(origPrice) || 0;
//     if (orig <= 0) {
//       setSuggestedPrice(null);
//       return;
//     }

//     let multiplier = 0.50; // Default Good
//     if (condition === 'Brand New') multiplier = 0.80;
//     else if (condition === 'Like New') multiplier = 0.65;
//     else if (condition === 'Good') multiplier = 0.50;
//     else if (condition === 'Fair') multiplier = 0.35;

//     const suggested = Math.round(orig * multiplier);
//     setSuggestedPrice(suggested);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!user.prn) {
//       setError('Please sign in first to post an item.');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/listings', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...formData,
//           seller_prn: user.prn
//         })
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error);

//       alert('Item posted successfully!');
//       onNavigate('browse');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-brandCream flex flex-col text-slate-800">
//       {/* Top Bar */}
//       <nav className="w-full px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-50">
//         <button 
//           onClick={() => onNavigate('browse')} 
//           className="flex items-center space-x-2 text-brandNavy font-semibold hover:underline cursor-pointer"
//         >
//           <ArrowLeft size={18} />
//           <span>Back to Browse</span>
//         </button>
//         <span className="font-black text-brandNavy text-xl">Post Campus Listing</span>
//         <div className="w-20"></div>
//       </nav>

//       {/* Main Form Container */}
//       <main className="max-w-2xl mx-auto w-full p-8 my-8 bg-white rounded-2xl shadow-sm border border-slate-200">
//         <h2 className="text-2xl font-black text-brandNavy mb-1">Sell Used Gear</h2>
//         <p className="text-xs text-slate-500 mb-6">List items for verified students on campus.</p>

//         {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-xs rounded-xl">{error}</div>}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="text-xs font-semibold text-slate-600 uppercase">Item Title</label>
//             <input 
//               type="text" 
//               required 
//               placeholder="e.g., Data Structures & Algorithms Textbook"
//               className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="text-xs font-semibold text-slate-600 uppercase">Category</label>
//               <select 
//                 required
//                 className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//                 onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map(cat => (
//                   <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-xs font-semibold text-slate-600 uppercase">Item Condition</label>
//               <select 
//                 value={formData.item_condition}
//                 className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//                 onChange={(e) => {
//                   const cond = e.target.value;
//                   setFormData({ ...formData, item_condition: cond });
//                   calculateFairPrice(formData.original_price, cond);
//                 }}
//               >
//                 <option value="Brand New">Brand New</option>
//                 <option value="Like New">Like New</option>
//                 <option value="Good">Good</option>
//                 <option value="Fair">Fair</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="text-xs font-semibold text-slate-600 uppercase">Original Price (₹)</label>
//               <input 
//                 type="number" 
//                 placeholder="e.g., 800"
//                 className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//                 onChange={(e) => {
//                   const orig = e.target.value;
//                   setFormData({ ...formData, original_price: orig });
//                   calculateFairPrice(orig, formData.item_condition);
//                 }}
//               />
//             </div>

//             <div>
//               <label className="text-xs font-semibold text-slate-600 uppercase">Selling Price (₹)</label>
//               <input 
//                 type="number" 
//                 required 
//                 placeholder="e.g., 400"
//                 value={formData.price}
//                 className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//               />
//               {suggestedPrice !== null && (
//                 <div className="mt-2 flex items-center justify-between text-xs text-brandNavy bg-brandSky/20 p-2.5 rounded-xl font-medium">
//                   <span className="flex items-center space-x-1">
//                     <Sparkles size={14} className="text-brandPink" />
//                     <span>Suggested Fair Price: <strong>₹{suggestedPrice}</strong></span>
//                   </span>
//                   <button 
//                     type="button" 
//                     onClick={() => setFormData({ ...formData, price: suggestedPrice })}
//                     className="text-xs font-bold underline text-brandNavy hover:text-slate-900 cursor-pointer"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Campus Meetup Spot Selection */}
//           <div>
//             <label className="text-xs font-semibold text-slate-600 uppercase flex items-center space-x-1">
//               <MapPin size={14} className="text-brandNavy" />
//               <span>Preferred Campus Meetup Spot</span>
//             </label>
//             <select
//               value={formData.meetup_location}
//               onChange={(e) => setFormData({ ...formData, meetup_location: e.target.value })}
//               className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none font-medium text-slate-700"
//             >
//               {campusLocations.map((spot) => (
//                 <option key={spot} value={spot}>📍 {spot}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="text-xs font-semibold text-slate-600 uppercase">Description</label>
//             <textarea 
//               rows="4" 
//               required 
//               placeholder="Specify edition, physical condition, missing parts, or details about meeting up on campus..."
//               className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="text-xs font-semibold text-slate-600 uppercase">Image URL (Optional)</label>
//             <input 
//               type="text" 
//               placeholder="https://..."
//               className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//               onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
//             />
//           </div>

//           <button type="submit" className="w-full py-4 bg-brandNavy text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition cursor-pointer">
//             Publish Listing
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, MapPin, Image as ImageIcon, Upload } from 'lucide-react';

export default function CreateListing({ onNavigate }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    description: '',
    original_price: '',
    price: '',
    item_condition: 'Good',
    photo_url: '',
    meetup_location: 'Main Library'
  });
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const campusLocations = [
    'Main Library',
    'Central Canteen',
    'Computer Lab Block',
    'Main Gate / Security Desk',
    'Sports Complex & Ground',
    'Hostel Premises'
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  // Fair Price Suggestion Calculation
  const calculateFairPrice = (origPrice, condition) => {
    const orig = parseFloat(origPrice) || 0;
    if (orig <= 0) {
      setSuggestedPrice(null);
      return;
    }

    let multiplier = 0.50; // Default Good
    if (condition === 'Brand New') multiplier = 0.80;
    else if (condition === 'Like New') multiplier = 0.65;
    else if (condition === 'Good') multiplier = 0.50;
    else if (condition === 'Fair') multiplier = 0.35;

    const suggested = Math.round(orig * multiplier);
    setSuggestedPrice(suggested);
  };

  // Handle local image file selection and convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user.prn) {
      setError('Please sign in first to post an item.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          seller_prn: user.prn
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert('Item posted successfully!');
      onNavigate('browse');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-brandCream flex flex-col text-slate-800">
      {/* Top Bar */}
      <nav className="w-full px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-50">
        <button 
          onClick={() => onNavigate('browse')} 
          className="flex items-center space-x-2 text-brandNavy font-semibold hover:underline cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span>Back to Browse</span>
        </button>
        <span className="font-black text-brandNavy text-xl">Post Campus Listing</span>
        <div className="w-20"></div>
      </nav>

      {/* Main Form Container */}
      <main className="max-w-2xl mx-auto w-full p-8 my-8 bg-white rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black text-brandNavy mb-1">Sell Used Gear</h2>
        <p className="text-xs text-slate-500 mb-6">List items for verified students on campus.</p>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-xs rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">Item Title</label>
            <input 
              type="text" 
              required 
              placeholder="e.g., Data Structures & Algorithms Textbook"
              className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">Category</label>
              <select 
                required
                className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">Item Condition</label>
              <select 
                value={formData.item_condition}
                className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
                onChange={(e) => {
                  const cond = e.target.value;
                  setFormData({ ...formData, item_condition: cond });
                  calculateFairPrice(formData.original_price, cond);
                }}
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">Original Price (₹)</label>
              <input 
                type="number" 
                placeholder="e.g., 800"
                className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
                onChange={(e) => {
                  const orig = e.target.value;
                  setFormData({ ...formData, original_price: orig });
                  calculateFairPrice(orig, formData.item_condition);
                }}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">Selling Price (₹)</label>
              <input 
                type="number" 
                required 
                placeholder="e.g., 400"
                value={formData.price}
                className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              {suggestedPrice !== null && (
                <div className="mt-2 flex items-center justify-between text-xs text-brandNavy bg-brandSky/20 p-2.5 rounded-xl font-medium">
                  <span className="flex items-center space-x-1">
                    <Sparkles size={14} className="text-brandPink" />
                    <span>Suggested Fair Price: <strong>₹{suggestedPrice}</strong></span>
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setFormData({ ...formData, price: suggestedPrice })}
                    className="text-xs font-bold underline text-brandNavy hover:text-slate-900 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Campus Meetup Spot Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase flex items-center space-x-1">
              <MapPin size={14} className="text-brandNavy" />
              <span>Preferred Campus Meetup Spot</span>
            </label>
            <select
              value={formData.meetup_location}
              onChange={(e) => setFormData({ ...formData, meetup_location: e.target.value })}
              className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none font-medium text-slate-700"
            >
              {campusLocations.map((spot) => (
                <option key={spot} value={spot}>📍 {spot}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">Description</label>
            <textarea 
              rows="4" 
              required 
              placeholder="Specify edition, physical condition, missing parts, or details about meeting up on campus..."
              className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Local Device Photo Upload Box */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase flex items-center space-x-1 mb-1.5">
              <ImageIcon size={14} className="text-brandNavy" />
              <span>Upload Photo from Device</span>
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                <Upload size={24} className="text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-600">Click to select photo</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {formData.photo_url && (
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                  <img src={formData.photo_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-brandNavy text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition cursor-pointer">
            Publish Listing
          </button>
        </form>
      </main>
    </div>
  );
}