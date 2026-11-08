// import React, { useState, useEffect, useRef } from 'react';
// import { ArrowLeft, ShieldCheck, MessageSquare, MapPin, User, X, Send } from 'lucide-react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000');

// function ChatModal({ listing, onClose }) {
//   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');
//   const messagesEndRef = useRef(null);

//   const room = `listing_${listing.listing_id}_${[currentUser.prn, listing.seller_prn].sort().join('_')}`;

//   useEffect(() => {
//     socket.emit('join_room', room);

//     fetch(`http://localhost:5000/api/messages/${listing.listing_id}/${currentUser.prn}/${listing.seller_prn}`)
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) setMessages(data);
//       })
//       .catch(err => console.error(err));

//     socket.on('receive_message', (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off('receive_message');
//     };
//   }, [room]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;

//     const messageData = {
//       sender_prn: currentUser.prn,
//       receiver_prn: listing.seller_prn,
//       listing_id: listing.listing_id,
//       message_text: text,
//       room
//     };

//     socket.emit('send_message', messageData);
//     setText('');
//   };

//   return (
//     <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden flex flex-col h-[600px] border border-slate-200">
        
//         <div className="bg-brandNavy text-white px-6 py-4 flex items-center justify-between">
//           <div>
//             <h3 className="font-bold text-base">{listing.title}</h3>
//             <p className="text-xs text-slate-300 flex items-center space-x-1 mt-0.5">
//               <MapPin size={12} />
//               <span>Meetup Spot: <strong>{listing.meetup_location || 'Main Library'}</strong></span>
//             </p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition cursor-pointer">
//             <X size={20} />
//           </button>
//         </div>
//         <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
//           <div className="text-center my-2">
//             <span className="bg-brandSky/20 text-brandNavy text-[11px] font-bold px-3 py-1 rounded-full">
//               🔒 Secure Campus Chat • Verified PRN Endpoints
//             </span>
//           </div>

//           {messages.map((msg, index) => {
//             const myMessage = msg.sender_prn === currentUser.prn;
//             return (
//               <div key={index} className={`flex ${myMessage ? 'justify-end' : 'justify-start'}`}>
//                 <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
//                   myMessage ? 'bg-brandNavy text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
//                 }`}>
//                   <p>{msg.message_text}</p>
//                   <span className={`text-[10px] block mt-1 text-right ${myMessage ? 'text-slate-300' : 'text-slate-400'}`}>
//                     {new Date(msg.sent_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//           <div ref={messagesEndRef} />
//         </div>

//         <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-2">
//           <input 
//             type="text" 
//             placeholder="Negotiate price or arrange campus meetup..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
//           />
//           <button type="submit" className="p-3 bg-brandNavy hover:bg-slate-800 text-white rounded-xl transition cursor-pointer shadow-md">
//             <Send size={18} />
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// }

// export default function ListingDetail({ listingId, onNavigate }) {
//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/listings/${listingId}`)
//       .then(res => res.json())
//       .then(data => {
//         setItem(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [listingId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-brandCream flex items-center justify-center text-brandNavy font-semibold">
//         Loading item details...
//       </div>
//     );
//   }

//   if (!item || item.error) {
//     return (
//       <div className="min-h-screen bg-brandCream flex flex-col items-center justify-center space-y-4">
//         <p className="text-slate-600 font-medium">Item not found or no longer available.</p>
//         <button onClick={() => onNavigate('browse')} className="px-6 py-2.5 bg-brandNavy text-white rounded-xl font-semibold cursor-pointer">
//           Back to Browse
//         </button>
//       </div>
//     );
//   }

//   const discount = item.original_price && item.original_price > item.price
//     ? Math.round(((item.original_price - item.price) / item.original_price) * 100)
//     : null;

//   return (
//     <div className="min-h-screen bg-brandCream flex flex-col text-slate-800">
//       <nav className="w-full px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-50 shadow-sm">
//         <button onClick={() => onNavigate('browse')} className="flex items-center space-x-2 text-brandNavy font-semibold hover:underline cursor-pointer">
//           <ArrowLeft size={18} />
//           <span>Back to Browse</span>
//         </button>
//         <span className="font-black text-brandNavy text-xl">Campus Marketplace</span>
//         <div className="w-20"></div>
//       </nav>

//       <main className="max-w-6xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
//         {/* Left: Product Image & Description */}
//         <div className="lg:col-span-7 space-y-6">
//           <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 h-[400px] flex items-center justify-center relative">
//             {item.photo_url ? (
//               <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover" />
//             ) : (
//               <span className="text-slate-400 font-medium">No Photo Provided</span>
//             )}
//             <span className="absolute top-4 left-4 bg-brandNavy/90 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-xs font-bold uppercase">
//               {item.category_name}
//             </span>
//             <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-brandNavy px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
//               {item.item_condition}
//             </span>
//           </div>

//           <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-4">
//             <h2 className="text-xl font-black text-brandNavy">Item Description</h2>
//             <p className="text-slate-600 leading-relaxed whitespace-pre-line">{item.description}</p>
//           </div>
//         </div>

//         {/* Right: Pricing, Specs, Meetup Spot & Verified Seller Profile */}
//         <div className="lg:col-span-5 space-y-6">
//           <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
//             <div>
//               <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.category_name}</span>
//               <h1 className="text-2xl font-black text-brandNavy mt-1">{item.title}</h1>
//             </div>

//             <div className="flex items-baseline space-x-3">
//               <span className="text-4xl font-black text-brandPink">₹{item.price}</span>
//               {item.original_price && (
//                 <span className="text-lg text-slate-400 line-through">₹{item.original_price}</span>
//               )}
//               {discount && (
//                 <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
//                   {discount}% OFF Fair Price
//                 </span>
//               )}
//             </div>

//             <div className="border-t border-slate-100 pt-6 space-y-3">
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-500">Condition</span>
//                 <span className="font-semibold text-slate-800">{item.item_condition}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-500">Listed On</span>
//                 <span className="font-semibold text-slate-800">{new Date(item.created_at).toLocaleDateString()}</span>
//               </div>
//             </div>

//             {/* Preferred Campus Meetup Spot Badge */}
//             <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center space-x-3">
//               <div className="p-2.5 bg-brandNavy text-white rounded-xl shrink-0">
//                 <MapPin size={20} />
//               </div>
//               <div>
//                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Campus Meetup Spot</span>
//                 <h4 className="font-bold text-brandNavy text-sm">{item.meetup_location || 'Main Library'}</h4>
//               </div>
//             </div>

//             {/* Seller Profile Card */}
//             <div className="border-t border-slate-100 pt-6 space-y-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-brandSky/30 text-brandNavy rounded-full flex items-center justify-center font-bold text-lg shrink-0">
//                   {item.seller_name ? item.seller_name[0].toUpperCase() : <User size={20} />}
//                 </div>
//                 <div>
//                   <div className="flex items-center space-x-1.5">
//                     <h3 className="font-bold text-slate-800">{item.seller_name}</h3>
//                     <ShieldCheck size={16} className="text-brandNavy" title="PRN Verified Student" />
//                   </div>
//                   <p className="text-xs text-slate-500">{item.seller_dept} Department • Year {item.seller_year}</p>
//                 </div>
//               </div>
//               <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-500 flex items-center space-x-2">
//                 <ShieldCheck size={14} className="text-brandNavy shrink-0" />
//                 <span>Verified student identity checked via college master PRN registry.</span>
//               </div>
//             </div>

//             {currentUser.prn !== item.seller_prn ? (
//               <button 
//                 onClick={() => setIsChatOpen(true)}
//                 className="w-full py-4 bg-brandNavy text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition flex items-center justify-center space-x-2 cursor-pointer"
//               >
//                 <MessageSquare size={18} />
//                 <span>Chat with Seller</span>
//               </button>
//             ) : (
//               <div className="w-full py-3 bg-slate-100 text-slate-500 text-center font-semibold rounded-xl text-sm">
//                 This is your listing
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       {isChatOpen && <ChatModal listing={item} onClose={() => setIsChatOpen(false)} />}
//     </div>
//   );
// // }

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ShieldCheck, MessageSquare, MapPin, User, X, Send } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function ChatModal({ listing, onClose }) {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  // Determine if the current user is the seller
  const isSeller = currentUser.prn === listing.seller_prn;

  // If seller is viewing, we need to know who the buyer is. For simplicity in a 1-to-1 modal, 
  // we fetch the last messaged user or default to the most recent sender if available, 
  // or let the seller select/view messages. Let's make it robust:
  const [targetBuyerPrn, setTargetBuyerPrn] = useState(null);

  useEffect(() => {
    // Fetch initial messages for this listing to discover active buyer threads if seller
    fetch(`http://localhost:5000/api/listings/${listing.listing_id}`)
      .catch(err => console.error(err));
  }, [listing.listing_id]);

  // For a direct chat window opened from a listing:
  // If user is buyer -> seller is listing.seller_prn
  // If user is seller -> we look up messages or default to the buyer PRN interacting with this item
  const otherUserPrn = isSeller ? targetBuyerPrn : listing.seller_prn;

  // If otherUserPrn is not yet set for a seller, we can fetch message threads for this listing first
  useEffect(() => {
    if (isSeller && !targetBuyerPrn) {
      // Fetch all messages for this listing to find who has been chatting
      fetch(`http://localhost:5000/api/messages/${listing.listing_id}/${currentUser.prn}/${currentUser.prn}`)
        .catch(() => {});
    }
  }, [isSeller, listing.listing_id, currentUser.prn, targetBuyerPrn]);

  // Fallback room or sorted room
  const participants = otherUserPrn ? [currentUser.prn, otherUserPrn].sort() : null;
  const room = participants ? `listing_${listing.listing_id}_${participants[0]}_${participants[1]}` : `listing_${listing.listing_id}_general`;

  useEffect(() => {
    if (!participants) return;

    socket.emit('join_room', room);

    fetch(`http://localhost:5000/api/messages/${listing.listing_id}/${participants[0]}/${participants[1]}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMessages(data);
          // If seller and no target set yet, pick the sender of the last message who isn't the seller
          if (isSeller && !targetBuyerPrn && data.length > 0) {
            const lastMsg = data[data.length - 1];
            const foundBuyer = lastMsg.sender_prn === currentUser.prn ? lastMsg.receiver_prn : lastMsg.sender_prn;
            if (foundBuyer && foundBuyer !== currentUser.prn) {
              setTargetBuyerPrn(foundBuyer);
            }
          }
        }
      })
      .catch(err => console.error(err));

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [room, participants, isSeller, currentUser.prn, listing.listing_id, targetBuyerPrn]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || !otherUserPrn) return;

    const messageData = {
      sender_prn: currentUser.prn,
      receiver_prn: otherUserPrn,
      listing_id: listing.listing_id,
      message_text: text,
      room
    };

    socket.emit('send_message', messageData);
    setText('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden flex flex-col h-[600px] border border-slate-200">
        
        <div className="bg-brandNavy text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">{listing.title}</h3>
            <p className="text-xs text-slate-300 flex items-center space-x-1 mt-0.5">
              <MapPin size={12} />
              <span>Meetup Spot: <strong>{listing.meetup_location || 'Main Library'}</strong></span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {isSeller && !targetBuyerPrn ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-3">
            <p className="text-slate-600 text-sm font-medium">Select a buyer thread or wait for incoming messages on this listing.</p>
            {/* Quick selector if needed or prompt */}
            <input 
              type="text" 
              placeholder="Enter Buyer PRN to chat..." 
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  setTargetBuyerPrn(e.target.value.trim());
                }
              }}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm outline-none w-full max-xs"
            />
            <span className="text-[11px] text-slate-400">Type buyer PRN above & press Enter to open chat thread.</span>
          </div>
        ) : (
          <>
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
              <div className="text-center my-2">
                <span className="bg-brandSky/20 text-brandNavy text-[11px] font-bold px-3 py-1 rounded-full">
                  🔒 Secure Campus Chat • Verified PRN Endpoints
                </span>
              </div>

              {messages.map((msg, index) => {
                const myMessage = msg.sender_prn === currentUser.prn;
                return (
                  <div key={index} className={`flex ${myMessage ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      myMessage ? 'bg-brandNavy text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}>
                      <p>{msg.message_text}</p>
                      <span className={`text-[10px] block mt-1 text-right ${myMessage ? 'text-slate-300' : 'text-slate-400'}`}>
                        {new Date(msg.sent_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Type your message to buyer..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
              />
              <button type="submit" className="p-3 bg-brandNavy hover:bg-slate-800 text-white rounded-xl transition cursor-pointer shadow-md">
                <Send size={18} />
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}export default function ListingDetail({ listingId, onNavigate }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetch(`http://localhost:5000/api/listings/${listingId}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [listingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brandCream flex items-center justify-center text-brandNavy font-semibold">
        Loading item details...
      </div>
    );
  }

  if (!item || item.error) {
    return (
      <div className="min-h-screen bg-brandCream flex flex-col items-center justify-center space-y-4">
        <p className="text-slate-600 font-medium">Item not found or no longer available.</p>
        <button onClick={() => onNavigate('browse')} className="px-6 py-2.5 bg-brandNavy text-white rounded-xl font-semibold cursor-pointer">
          Back to Browse
        </button>
      </div>
    );
  }

  const discount = item.original_price && item.original_price > item.price
    ? Math.round(((item.original_price - item.price) / item.original_price) * 100)
    : null;

  return (
    <div className="min-h-screen bg-brandCream flex flex-col text-slate-800">
      <nav className="w-full px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button onClick={() => onNavigate('browse')} className="flex items-center space-x-2 text-brandNavy font-semibold hover:underline cursor-pointer">
          <ArrowLeft size={18} />
          <span>Back to Browse</span>
        </button>
        <span className="font-black text-brandNavy text-xl">Campus Marketplace</span>
        <div className="w-20"></div>
      </nav>

      <main className="max-w-6xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Product Image & Description */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 h-[400px] flex items-center justify-center relative">
            {item.photo_url ? (
              <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-slate-400 font-medium">No Photo Provided</span>
            )}
            <span className="absolute top-4 left-4 bg-brandNavy/90 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-xs font-bold uppercase">
              {item.category_name}
            </span>
            <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-brandNavy px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
              {item.item_condition}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-xl font-black text-brandNavy">Item Description</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{item.description}</p>
          </div>
        </div>

        {/* Right: Pricing, Specs, Meetup Spot & Verified Seller Profile */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.category_name}</span>
              <h1 className="text-2xl font-black text-brandNavy mt-1">{item.title}</h1>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-black text-brandPink">₹{item.price}</span>
              {item.original_price && (
                <span className="text-lg text-slate-400 line-through">₹{item.original_price}</span>
              )}
              {discount && (
                <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                  {discount}% OFF Fair Price
                </span>
              )}
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Condition</span>
                <span className="font-semibold text-slate-800">{item.item_condition}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Listed On</span>
                <span className="font-semibold text-slate-800">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Preferred Campus Meetup Spot Badge */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center space-x-3">
              <div className="p-2.5 bg-brandNavy text-white rounded-xl shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Campus Meetup Spot</span>
                <h4 className="font-bold text-brandNavy text-sm">{item.meetup_location || 'Main Library'}</h4>
              </div>
            </div>

            {/* Seller Profile Card */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-brandSky/30 text-brandNavy rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  {item.seller_name ? item.seller_name[0].toUpperCase() : <User size={20} />}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-bold text-slate-800">{item.seller_name}</h3>
                    <ShieldCheck size={16} className="text-brandNavy" title="PRN Verified Student" />
                  </div>
                  <p className="text-xs text-slate-500">{item.seller_dept} Department • Year {item.seller_year}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-500 flex items-center space-x-2">
                <ShieldCheck size={14} className="text-brandNavy shrink-0" />
                <span>Verified student identity checked via college master PRN registry.</span>
              </div>
            </div>

          {currentUser.prn !== item.seller_prn ? (
              <button 
                onClick={() => setIsChatOpen(true)}
                className="w-full py-4 bg-brandNavy text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageSquare size={18} />
                <span>Chat with Seller</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsChatOpen(true)}
                className="w-full py-4 bg-brandNavy text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageSquare size={18} />
                <span>Open Buyer Inquiries / Chat</span>
              </button>
            )}
          </div>
        </div>
      </main>

      {isChatOpen && <ChatModal listing={item} onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}