import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MarkersPage from './Page/MarkersPage'
import { Routes, Route } from 'react-router-dom'
import CrimeReportPage from './Page/CrimeReportPage'
import LoginPage from './Page/Login'
import ProtectedRoute from './components/ProtectedRoute';


import HeatMap from './components/HeatMap';

function App() {

  const heatmapData = [
    [51.505, -0.09, 0.5],  // Latitude, Longitude, Intensity
    [51.515, -0.1, 0.3],
    [51.52, -0.12, 0.8]
  ];

  return (
    <>
      <Routes>
        <Route path="/Location" element={<MarkersPage />} />
        <Route path="/Reports" element={<CrimeReportPage />} />
        <Route path='/HeatMap' element={<HeatMap />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

    </>
  )
}

export default App
