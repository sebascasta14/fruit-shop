import './Fruits.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
// import { useCart } from '../hooks/useCart.js'

export function Products ({ fruits }) {
//   const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = fruit => {
    // return cart.some(item => item.id === fruit.id)
  }

  return (
    <main className='fruits'>
      <ul>
        {fruits.map(fruit => {
          const isProductInCart = checkProductInCart(fruit)

          return (
            <li key={fruit.id}>
              <img
                src={fruit.thumbnail}
                alt={fruit.title}
              />
              <div>
                <strong>{fruit.title}</strong> - ${fruit.price}
              </div>
              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }} onClick={() => {
                    isProductInCart
                      ? removeFromCart(fruit)
                      : addToCart(fruit)
                  }}
                >
                  {
                    isProductInCart
                      ? <RemoveFromCartIcon />
                      : <AddToCartIcon />
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
