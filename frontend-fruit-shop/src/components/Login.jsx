import { useState } from 'react'
import { useLoginMutation } from '../features/api/apiSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../features/authSlice'
import './Login.css'


export function Login(){
    const [login] = useLoginMutation();
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError(false)
            const user = {
                username: e.target.username.value,
                password: e.target.password.value,
            }
            const response = await login(user)
            
            if(response.error && response.error.data.status == "error"){
                setError(true)
            }else{
                localStorage.setItem('sessionData', JSON.stringify(response.data))
                dispatch(loginSuccess(response.data))
                .then(
                    navigate('/fruits') // Hacemos la redireccion
                )
                
            }
        } catch (error) {
        }
    }

    return (
        <div className='login-container'>
            {!error ? null : 
                (<div className=''>
                    Datos Invalidos
            </div>
            )}
            <form onSubmit={handleSubmit} className='login-form'>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="username" 
                            required 
                            name="username" 
                            placeholder="Username" 
                    />
                </div>
                <div >
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                            required 
                            minLength="3"
                            name="password" 
                            placeholder="Password" 
                    />
                </div>
                <div>
                    <button type="submit" className=''>Iniciar Sesion</button>
                </div>
            </form>
        </div>
    )
}