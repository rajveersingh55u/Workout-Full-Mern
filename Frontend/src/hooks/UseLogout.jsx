import React from 'react'
import {UseAuthContext} from './UseAuthContext'
import {UseWorkoutsContext} from './UseWorkoutsContext'


export const UseLogout= () => {

    const {dispatch} = UseAuthContext()
    const {dispatch: workoutDispatch} = UseWorkoutsContext()

    const logout = () =>{
        // remove user from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutDispatch({type: 'SET_WORKOUTS', payload: null})
    }
    return {logout}
}

