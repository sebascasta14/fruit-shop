import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import { useState } from 'react'

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
    navigate('/login')
  }

  return (
    <nav className=''>
      <ul className=''>
        {!isAuthenticated ? null : (
          <>
            <li>
              <Link to="/login" className="hover:text-blue-500">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/fruits" className="hover:text-blue-500">
              Lista de Frutas
              </Link>
            </li>
          </>
        )}
      </ul>
      {/* DropDown Usuario Logueado */}
      <div className=''>
        {isAuthenticated ? (
          <>
            <div className=''>
            <button
                onClick={toggleMenu}
              />
              {isOpen && (
              <div className=''>
                <p className=''>{user.username}</p>
                <a
                  onClick={handleLogout}
                  className=''
                >
                  Logout
                </a>
              </div>
              )}
            </div>
          </>
        ) : (
          <Link to='/login' className=''></Link>
        )}
      </div>
    </nav>
  )
}
