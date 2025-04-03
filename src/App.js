import React from 'react';
import './App.css';
import AdminPage from './design/admin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketPage from './design/ticket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/tickets" element={<TicketPage />} />
      </Routes>
    </Router>
    );
}

export default App;