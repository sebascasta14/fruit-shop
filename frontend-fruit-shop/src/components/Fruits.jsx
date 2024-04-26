/* eslint-disable react/prop-types */
import './Fruits.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'

export function Fruits ({ fruits }) {
  return (
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
                  {
                       <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
