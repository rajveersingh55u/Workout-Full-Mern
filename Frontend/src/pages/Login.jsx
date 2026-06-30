import React, { useState } from 'react'
import {UseLogin} from '../hooks/UseLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = UseLogin()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        // console.log(email, password);
        await login(email, password)
        
    }
    
    return(
        <form className='login' onSubmit={handleSubmit}>
            <h4>Login In</h4>

            <label>Email:</label>
            <input type='email'
            value ={email}
             onChange={(e) => setEmail(e.target.value)} 
              />

            <label>Password:</label>
            <input type='password' value ={password} onChange={(e) => setPassword(e.target.value)}  />

            <button disabled={isLoading}>Log IN</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login