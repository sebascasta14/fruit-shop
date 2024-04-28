import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux'
import { Header } from './components/Header.jsx'
import { Fruits } from './components/Fruits.jsx'
import { Login } from './components/Login.jsx'

import { useAPI } from './hooks/API.js'

function App () {
  const { fruits } = useAPI()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
  <>
    <BrowserRouter>
    {
      isAuthenticated ? <Header /> : null

    }
      <Routes>
        <Route path="/fruits" element={<Fruits fruits = {fruits} />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
