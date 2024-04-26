import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from './components/Header.jsx'
import { Fruits } from './components/Fruits.jsx'
import { Login } from './components/Login.jsx'

import { useAPI } from './hooks/API.js'

function App () {
  const { fruits } = useAPI()

  return (
  <>
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/fruits" element={<Fruits fruits = {fruits} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
