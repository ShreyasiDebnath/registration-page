import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login'; // Import your Login component
import Dashboard from './components/ProtectedPage'; // Import your Dashboard component
import Signup from './components/Signup';
import Verify from './components/Verify';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
