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
import CCRNA from "./pages/CCRNA";
import JustForToday from "./pages/JustForToday";
import ImageGallery from "./pages/ImageGallery";
import GSRReport from "./pages/GSRReport";
import AIChat from "./components/AIChat";
import SpiritualPrinciple from "./pages/SpiritualPrinciple"; // Importing Spiritual Principle component

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/profile" /> : <HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
        <Route path="/ccrna" element={<CCRNA />} />
        <Route path="/just-for-today" element={<JustForToday />} />
        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/gsrreport" element={<GSRReport />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/spiritual-principle" element={<SpiritualPrinciple />} /> {/* New Route for Spiritual Principle */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
