import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Templates from './pages/Templates';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import ResumeBuilder from './pages/ResumeBuilder';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/builder/:templateId" element={<ResumeBuilder />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;