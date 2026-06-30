import React from "react";
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";


//Data Fns
import  formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { UseAuthContext } from "../hooks/UseAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = UseWorkoutsContext();
  const { user } = UseAuthContext()

  const handleClick = async () => {

    if(!user){
      return 
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    console.log(response.status);
    console.log(json);

    if (response.ok) {
      dispatch({
        type: "DELETE_WORKOUT",
        payload: json,
      });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (in kgs):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps:</strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
      <span
        className='material-symbols-outlined'
        onClick={handleClick}
      >
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
