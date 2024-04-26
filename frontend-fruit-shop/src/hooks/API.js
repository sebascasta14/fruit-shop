import { useEffect, useState } from 'react'

export function useAPI () {
  const [fruits, setFruits] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/fruit')
      .then(res => res.json())
      .then(json =>
        setFruits(json)
      )
  }, [])
  return { fruits }
}
