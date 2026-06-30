const express = require('express');

//User Controller function
const {signupUser, loginUser} = require('../controllers/userController')

const router = express.Router()

//login routes
router.post('/login', loginUser)

//signUp routes
router.post('/signup', signupUser)

module.exports =router;