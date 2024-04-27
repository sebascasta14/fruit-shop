import { useEffect, useState } from 'react'

export function useAPI () {
  const [fruits, setFruits] = useState([])

  useEffect(() => {
    fetch('https://backend-fruit-shop.vercel.app/fruit')
      .then(res => res.json())
      .then(json =>
        setFruits(json)
      )
  }, [])
  return { fruits }
}
