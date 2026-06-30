const express = require ('express');
const Workout = require('../models/workoutModel');
const { createWorkout, getWorkouts, getWorkout , deleteWorkout, updateWorkout} = require('../controllers/workoutController');
const requireAuth =require('../middleware/requireAuth')

const router = express.Router()

//requireAuth for all workout routes
router.use(requireAuth)

/*
    Route: /api/workouts
    method: GET
    Description: Get aall workouts
    Access: Public
    Parameters: none
    */
    router.get('/',getWorkouts)

    /*
    Route: /api/workouts/:id
    method: GET
    Description: Get a single workout by its ID
    Access: Public
    Parameters: id
    */
    router.get('/:id', getWorkout)

     /*
    Route: /api/workouts
    method: PoST
    Description: Create or Add New Workout
    Access: Public
    Parameters: none
    */
    router.post('/', createWorkout)

     /*
    Route: /api/workouts/:id
    method: delete
    Description: Create or Add New Workout
    Access: Public
    Parameters: none
    */
    router.delete('/:id', deleteWorkout)
     /*
    Route: /api/workouts
    method: Patch
    Description: Create or Add New Workout
    Access: Public
    Parameters: none
    */
    router.patch('/:id',updateWorkout)



module.exports = router;