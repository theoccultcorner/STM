import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import Navbar from "./components/Navbar"; // Corrected import with consistent casing
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Profile from "./pages/Profile";
import Calender from "./pages/Calender"; // Keeping the original 'Calender' spelling
import Community from "./pages/Community";
import CcrnaComponent from "./components/CcrnaComponent"; // Import the CCRNA component

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <Navbar /> {/* Correct import */}
      <Routes>
        {/* Redirect to Profile if user is authenticated */}
        <Route path="/" element={user ? <Navigate to="/profile" /> : <HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/community" element={<Community />} />
        {/* Protected Route for Profile, redirects if not authenticated */}
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
        {/* CCRNA Component Route */}
        <Route path="/ccrna" element={<CcrnaComponent />} />
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
