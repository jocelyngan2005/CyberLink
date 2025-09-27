import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import FreelancerDashboard from './pages/FreelancerDashboard'
import SMEDashboard from './pages/SMEDashboard'
import EventOrganizerDashboard from './pages/EventOrganizerDashboard'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/freelancer/*" element={<FreelancerDashboard />} />
            <Route path="/sme/*" element={<SMEDashboard />} />
            <Route path="/event-organizer/*" element={<EventOrganizerDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
