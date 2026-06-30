// import React, { useEffect, useState } from 'react'
import React, { useEffect } from "react";

//components import
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";
import { UseAuthContext } from "../hooks/UseAuthContext";

const Home = () => {
  //useState
  // const [workouts,setworkout] = useState(null)
  // const [workouts,setworkout] = useState([])
  const { workouts, dispatch } = UseWorkoutsContext();
  const { user } = UseAuthContext();

  console.log("User object:", user);
  console.log("User token:", user?.token);
  console.log("LocalStorage:", localStorage.getItem("user"));
  useEffect(() => {
    const fetchworkouts = async () => {
      const response = await fetch("/api/workouts/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Status: ", response.status);

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        dispatch({
          type: "SET_WORKOUTS",
          payload: json,
        });
      }
    };
    if (user) {
      fetchworkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            // <p Keys={workout_id}>{workout.title}</p>
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm /*setworkout={setworkout} */ />
    </div>
  );
};

export default Home;
