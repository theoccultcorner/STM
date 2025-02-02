import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Profile from "./pages/Profile";
import Calender from "./pages/Calender";
import Community from "./pages/Community"; 

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while Firebase checks auth status
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={user ? <Navigate to="/profile" /> : <Profile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/community" element={<Community />} />
        {/* Protected Route for Profile */}
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />

        {/* Redirect all unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
