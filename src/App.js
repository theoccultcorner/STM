import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import Navbar from "./components/Navbar"; // Assuming the Navbar is imported correctly
import Footer from "./components/Footer"; // Assuming the Footer is imported correctly
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Profile from "./pages/Profile";
import Calender from "./pages/Calender"; // Keeping the original 'Calender' spelling
import Community from "./pages/Community";
 

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
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/profile" /> : <HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
