const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//All Api Logic
//Get all workouts
exports.getWorkouts = async(req,res)=>{
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    
    if(!workouts)
        return res.status(400).json({error:"No entries Found"})

    res.status(200).json(workouts)
} 
//get a single workout by its id
exports.getWorkout = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Workout"})
    }
    const workout = await Workout.findById(id);
    if(!workout)
        return res.status(404).json({error:"No such workout"})
    res.status(200).json(workout)
}

//create a new workouts
exports.createWorkout = async(req,res)=>{

    

     console.log(req.body);
        const {title,load, reps} = req.body;

        let emptyFields = [];
        if(!title){
            emptyFields.push('title')
        }else if(!load){
            emptyFields.push('load')
        }else if(!reps){
            emptyFields.push('reps')
        }
        if(emptyFields.length > 0){
            return res.status(400).json(
                {error:'Please fill out all the fields! ', emptyFields})
        }
        //add doc to db
        try{
            const user_id = req.user._id
            const workout = await Workout.create( {title,load, reps, user_id} )
            res.status(200).json(workout)
        }catch(error){
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
 };

//delete workout by its id
exports.deleteWorkout = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Workout"})
    }
    const workout = await Workout.findOneAndDelete({_id:id});
    if(!workout)
        return res.status(400).json({error:"No such workout to delete"})
    res.status(200).json(workout)
}

//update a workouts by its id
exports.updateWorkout = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Workout"})
    }
    const workout = await Workout.findOneAndUpdate(
        {
          _id:id
        },
       {
         ...req.body
       },
       {
         new: true
       }
    );
    if(!workout)
        return res.status(400).json({error:"No such workout to delete"})
    res.status(200).json(workout)
}