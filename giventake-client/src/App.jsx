// import React, { useState } from 'react';
// import LandingPage from './components/LandingPage';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
// import BrowsePage from './components/BrowsePage';
// import CreateListing from './components/CreateListing';
// import ListingDetail from './components/ListingDetail';
// import UserProfile from './components/UserProfile';
// import AdminPanel from './components/AdminPanel'; // <-- Added import for Admin Panel

// export default function App() {
//   const [currentView, setCurrentView] = useState('landing');
//   const [selectedListingId, setSelectedListingId] = useState(null);

//   const handleNavigate = (view, id = null) => {
//     if (id !== null) {
//       setSelectedListingId(id);
//     }
//     setCurrentView(view);
//   };

//   return (
//     <>
//       {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}
//       {currentView === 'admin' && <AdminPanel onNavigate={handleNavigate} />}
//       {currentView === 'signup' && <SignUp onSwitchToSignIn={() => handleNavigate('signin')} onNavigate={handleNavigate} />}
//       {currentView === 'signin' && <SignIn onSwitchToSignUp={() => handleNavigate('signup')} onNavigate={handleNavigate} />}
//       {currentView === 'browse' && <BrowsePage onNavigate={handleNavigate} />}
//       {currentView === 'create-listing' && <CreateListing onNavigate={handleNavigate} />}
//       {currentView === 'listing-detail' && <ListingDetail listingId={selectedListingId} onNavigate={handleNavigate} />}
//       {currentView === 'profile' && <UserProfile onNavigate={handleNavigate} />}
//     </>
//   );
// }

// import React, { useState } from 'react';
// import LandingPage from './components/LandingPage';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
// import BrowsePage from './components/BrowsePage';
// import CreateListing from './components/CreateListing';
// import ListingDetail from './components/ListingDetail';
// import UserProfile from './components/UserProfile';

// export default function App() {
//   const [currentView, setCurrentView] = useState('landing');
//   const [selectedListingId, setSelectedListingId] = useState(null);

//   const handleNavigate = (view, id = null) => {
//     if (id !== null) {
//       setSelectedListingId(id);
//     }
//     setCurrentView(view);
//   };

//   return (
//     <>
//       {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}
//       {currentView === 'admin' && <AdminPanel onNavigate={handleNavigate} />}
//       {currentView === 'signup' && <SignUp onSwitchToSignIn={() => handleNavigate('signin')} onNavigate={handleNavigate} />}
//       {currentView === 'signin' && <SignIn onSwitchToSignUp={() => handleNavigate('signup')} onNavigate={handleNavigate} />}
//       {currentView === 'browse' && <BrowsePage onNavigate={handleNavigate} />}
//       {currentView === 'create-listing' && <CreateListing onNavigate={handleNavigate} />}
//       {currentView === 'listing-detail' && <ListingDetail listingId={selectedListingId} onNavigate={handleNavigate} />}
//       {currentView === 'profile' && <UserProfile onNavigate={handleNavigate} />}
//     </>
//   );
// }

// import React, { useState } from 'react';
// import LandingPage from './components/LandingPage';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
// import BrowsePage from './components/BrowsePage';
// import CreateListing from './components/CreateListing';
// import ListingDetail from './components/ListingDetail';
// import UserProfile from './components/UserProfile';
// import AdminPanel from './components/AdminPanel';
// import AdminLogin from './components/AdminLogin'; // <-- Import Admin Login

// export default function App() {
//   const [currentView, setCurrentView] = useState('landing');
//   const [selectedListingId, setSelectedListingId] = useState(null);

//   const handleNavigate = (view, id = null) => {
//     if (id !== null) {
//       setSelectedListingId(id);
//     }
//     // Security check: if trying to access admin view without admin session, redirect to admin login
//     if (view === 'admin' && !localStorage.getItem('admin')) {
//       setCurrentView('admin-login');
//       return;
//     }
//     setCurrentView(view);
//   };

//   return (
//     <>
//       {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}
//       {currentView === 'admin-login' && <AdminLogin onNavigate={handleNavigate} />}
//       {currentView === 'admin' && <AdminPanel onNavigate={handleNavigate} />}
//       {currentView === 'signup' && <SignUp onSwitchToSignIn={() => handleNavigate('signin')} onNavigate={handleNavigate} />}
//       {currentView === 'signin' && <SignIn onSwitchToSignUp={() => handleNavigate('signup')} onNavigate={handleNavigate} />}
//       {currentView === 'browse' && <BrowsePage onNavigate={handleNavigate} />}
//       {currentView === 'create-listing' && <CreateListing onNavigate={handleNavigate} />}
//       {currentView === 'listing-detail' && <ListingDetail listingId={selectedListingId} onNavigate={handleNavigate} />}
//       {currentView === 'profile' && <UserProfile onNavigate={handleNavigate} />}
//     </>
//   );
// }

import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import BrowsePage from './components/BrowsePage';
import CreateListing from './components/CreateListing';
import ListingDetail from './components/ListingDetail';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedListingId, setSelectedListingId] = useState(null);

  const handleNavigate = (view, id = null) => {
    if (id !== null) {
      setSelectedListingId(id);
    }
    setCurrentView(view);
  };

  return (
    <>
      {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentView === 'signup' && <SignUp onSwitchToSignIn={() => handleNavigate('signin')} onNavigate={handleNavigate} />}
      {currentView === 'signin' && <SignIn onSwitchToSignUp={() => handleNavigate('signup')} onNavigate={handleNavigate} />}
      {currentView === 'browse' && <BrowsePage onNavigate={handleNavigate} />}
      {currentView === 'create-listing' && <CreateListing onNavigate={handleNavigate} />}
      {currentView === 'listing-detail' && <ListingDetail listingId={selectedListingId} onNavigate={handleNavigate} />}
      {currentView === 'profile' && <UserProfile onNavigate={handleNavigate} />}
      {currentView === 'admin' && <AdminPanel onNavigate={handleNavigate} />}
    </>
  );
}