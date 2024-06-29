import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Page1 from './Page/Page1'
import { Routes, Route } from 'react-router-dom'
  
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/Page1" element={<Page1 />} />
      </Routes>

    </>
  )
}

export default App
