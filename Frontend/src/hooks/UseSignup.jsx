// import React, { useState } from 'react'
// import { UseAuthContext } from './UseAuthContext';

// export const UseSignup = () => {
//     const [error, setError]=useState(null);
//     const [isLoading, setIsLoading]=useState(null);
//     const {dispatch} = UseAuthContext()

//     const signup = async(email, password)=>{
//         setIsLoading(true)
//         setError(null)

//         const response = await fetch('http://localhost:4000/api/user/signup' ,
//             {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/json'
//             },
//             body: JSON.stringify({email, password})
//         })

//         const json = await response.json();

//         // console.log("STATUS:", response.status);
//         // console.log("RESPONSE: ", json);

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

//   return { signup ,isLoading ,error}
// }

import { useState } from "react";
import { UseAuthContext } from "./UseAuthContext";

export const UseSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = UseAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      //connection code to backend
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Signup failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(json));

      // auto-login after signup
      dispatch({ type: "LOGIN", payload: json });
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
