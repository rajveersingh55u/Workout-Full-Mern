


import { useState } from 'react'
import { UseAuthContext } from './UseAuthContext'

export const UseLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = UseAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      //connection code to backend
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      

      console.log("API URL:", import.meta.env.VITE_API_URL);
      console.log(
                   "Login URL:",
              `${import.meta.env.VITE_API_URL}/api/user/login`
       );

      const json = await response.json()

      if (!response.ok) {
        setError(json.error || 'Login failed')
        return
      }

      // save user
      localStorage.setItem('user', JSON.stringify(json))

      // update auth context
      dispatch({ type: 'LOGIN', payload: json })

    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}


// import React, { useState } from 'react'
// import { UseAuthContext } from './UseAuthContext';

// export const UseLogin = () => {
//     const [error, setError]=useState(null);
//     // const [isLoading, setIsLoading]=useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const {dispatch} = UseAuthContext()

//     const login = async(email, password)=>{
//         setIsLoading(true)
//         setError(null)
      
//         try{
//         const response = await fetch('/api/user/login',{
//             method: 'POST',
//             headers: { 'content-type' : 'application/json'},
//             body:JSON.stringify({email, password})
//         })

//         const json = await response.json();

//         if(!response.ok){
//             setIsLoading(false)
//             setError(json.error)
//         }
//         if(response.ok){
//             // save the user to browser local storage
//             localStorage.setItem('user', JSON.stringify(json))

//             // update global auth context
//             dispatch({type:'LOGIN', payload: json})

//             setIsLoading(false)
//         }
//     }

//   return { login ,isLoading ,error}
// }
