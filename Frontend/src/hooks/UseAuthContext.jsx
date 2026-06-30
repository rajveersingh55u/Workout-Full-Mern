import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const UseAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context){
      throw Error('useWAuthContext must be use inside a AuthContextProvider')
    }
  return context
}

