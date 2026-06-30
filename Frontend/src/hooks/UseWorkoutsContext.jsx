import React, { useContext } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'

export const UseWorkoutsContext = () => {
    const context = useContext(WorkoutContext)

    if(!context){
      throw Error('useWorkoutContext must be use inside a workoutContextProvider')
    }
  return context
}

