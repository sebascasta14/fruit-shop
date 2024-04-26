import { useEffect, useState } from 'react'
import { Fruits } from './components/Fruits.jsx'

function App () {
  const [fruits, setFruits] = useState([])

  useEffect(() => {
    
    fetch('http://localhost:3000/fruit')
      .then(res => res.json())
      .then(json =>
        setFruits(json)
      )
  }, [])

  return (
    <div>
      <h1>Lista de Frutas</h1>
      <Fruits fruits = {fruits} />
    </div>
  )
}

export default App
