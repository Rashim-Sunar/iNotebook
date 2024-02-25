const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body , validationResult} = require('express-validator')


//Create a User using: POST " /api/auth/user". Doesn't require Authentication
router.post('/user',[
    body('name',"Name must contain atleast 5 characters").isLength({min : 5}),
    body('email',"Invalid email").isEmail(),
    body('password',"Password must contain atleast 5 characters").isLength({min :5 }),
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    User.create({
        name : req.body.name,
        password : req.body.password,
        email : req.body.email
     }).then(user => res.json(user))
     .catch(err=>res.json({error : "Please enter a unique value" , message : err.message}))

})

module.exports = router