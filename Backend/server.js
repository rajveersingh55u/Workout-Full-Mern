//import express
const express = require('express')
const dotenv = require ('dotenv')
const mongoose = require ('mongoose')

const cors = require('cors')

//Routes
const woroutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

dotenv.config();


//express app
const app = express()

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://6a46d536c46ecc356284e1f3--classy-chaja-db9178.netlify.app'
  ],
  credentials: true
}))



//middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next()   
})

//Routes
app.get('/',(req,res)=>{
    res.json({msg:'Welcome to our app'})
})

app.use('/api/workouts',woroutRoutes)
app.use('/api/user',userRoutes)



//PORT 
const PORT = process.env.PORT || 4000;
//connect db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen request
  app.listen(PORT, () => {
    console.log(`server is up an listining at: http://localhost:${PORT} & connected to Our Database`);
  });
})
.catch((error) => {
  console.log(error);
});



