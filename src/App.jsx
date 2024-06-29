import { Route, Routes } from 'react-router-dom';
import './App.css';
import MarkersPage from './Page/MarkersPage';
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
        <Route path='/HeatMap' element={<HeatMap />} />
      </Routes>

    </>
  )
}

export default App
