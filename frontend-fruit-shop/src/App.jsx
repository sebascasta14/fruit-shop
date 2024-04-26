import { useEffect, useState } from 'react'

function App () {
  const [fruit, setFruit] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.fruityvice.com/api/fruit/family/Rosaceae')
        console.log(response)
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de frutas')
        }
        const data = await response.json()
        setFruit(data)
      } catch (error) {
        console.error('Error al obtener la lista de frutas:', error)
      }
    }
    fetchData()
  }, [])

  console.log(fruit)
  return (
    <div>
      <h1>Lista de Frutas</h1>
      {/* <ul>
        {fruit.map((fruit, index) => (
          <li key={index}>
            <strong>{fruit.name}</strong>
            {/* Puedes mostrar más detalles de la fruta aquí */}
          {/* </li>
        ))}
      </ul> */}
    </div>
  )
}

export default App
