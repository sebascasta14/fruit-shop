import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import { useState } from 'react'
import './Header.css'

export function Header () {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('sessionData')
    navigate('/')
  }

  return (
    <nav className='nav-container'>
      <ul>
        {!isAuthenticated ? null : (
          <>
            <li>
              <Link to="/">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/fruits">
              Lista de Frutas
              </Link>
            </li>
          </>
        )}
      </ul>
      {/* DropDown Usuario Logueado */}
      <div className='user-dropdown'>
        {isAuthenticated ? (
          <>
            <div>
            <button
              className='dropdown-toggle' 
              onClick={toggleMenu}
              />
              {isOpen && (
              <div className='dropdown-menu'>
                <p className='username'>{user.username}</p>
                <a
                  onClick={handleLogout}
                  className='logout-link'
                >
                  Logout
                </a>
              </div>
              )}
            </div>
          </>
        ) : (
          <Link to='/'></Link>
        )}
      </div>
    </nav>
  )
}
