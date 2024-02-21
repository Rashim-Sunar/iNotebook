const express = require('express')
const router = express.Router()
const User = require('../models/User')


//Create a User using: POST " /api/auth/user". Doesn't require Authentication
router.post('/user',(req,res)=>{
    console.log(req.body)
    try {
        const user = User(req.body)
        user.save()
        res.send('hello')
    } catch (error) {
        res.send(error.msg)
    }



})

module.exports = router