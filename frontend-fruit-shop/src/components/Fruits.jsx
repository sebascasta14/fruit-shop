/* eslint-disable react/prop-types */
import './Fruits.css'
import { AddToCartIcon } from './Icons.jsx'

export function Fruits ({ fruits }) {
  return (
    <>
      <h1>Lista de Frutas</h1>
      <main className='fruits'>
      <ul>
        {fruits.map(fruit => {
          return (
            <li key={fruit.id}>
              <img
                src={fruit.image}
                alt={fruit.name}
              />
              <div>
                <strong>{fruit.name}</strong> - ${fruit.price}
              </div>
              <div>
                <button>
                  { <AddToCartIcon /> }
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
    </>
  )
}
