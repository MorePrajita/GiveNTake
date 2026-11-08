import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MapPin, ShieldCheck } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function ChatModal({ listing, onClose }) {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  // Room identifier combining listing ID and both users' PRNs sorted
  const room = `listing_${listing.listing_id}_${[currentUser.prn, listing.seller_prn].sort().join('_')}`;

  useEffect(() => {
    socket.emit('join_room', room);

    // Fetch existing chat history
    fetch(`http://localhost:5000/api/messages/${listing.listing_id}/${currentUser.prn}/${listing.seller_prn}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch(err => console.error(err));

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const messageData = {
      sender_prn: currentUser.prn,
      receiver_prn: listing.seller_prn,
      listing_id: listing.listing_id,
      message_text: text,
      room
    };

    socket.emit('send_message', messageData);
    setText('');
  };

  const isSeller = currentUser.prn === listing.seller_prn;
  const chatPartnerName = isSeller ? 'Buyer' : listing.seller_name;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden flex flex-col h-[600px] border border-slate-200">
        
        {/* Chat Header */}
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

        {/* Message Feed */}
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
                    {new Date(msg.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Negotiate price or arrange campus meetup..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brandSky outline-none"
          />
          <button type="submit" className="p-3 bg-brandNavy hover:bg-slate-800 text-white rounded-xl transition cursor-pointer shadow-md">
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
}