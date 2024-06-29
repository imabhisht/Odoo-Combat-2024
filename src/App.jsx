import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MarkersPage from './Page/MarkersPage'
import { Routes, Route } from 'react-router-dom'
  
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/Location" element={<MarkersPage />} />
      </Routes>

    </>
  )
}

export default App
