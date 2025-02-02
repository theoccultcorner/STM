import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Calender from './pages/Calender'; // Ensure Calendar component exists

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/calender" element={<Calender />} /> {/* Calendar Page */}
      </Routes>
    </Router>
  );
}

export default App;
