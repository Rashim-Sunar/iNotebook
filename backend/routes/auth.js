const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const fetchUser = require('../middleware/fetchUser')

const TOKEN_SECRET= "09f26e402586e2faa8da4c98a35f1b20d6b033c60..."

//ROUTE-1 : Create a User using: POST " /api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Name must contain atleast 5 characters").isLength({ min: 5 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Password must contain atleast 5 characters").isLength({
      min: 5,
    }),
  ], async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user with same email exists already
      let user = await User.findOne({email:req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry the user with the email already exists" });
      }

      //Adding salt of 10 characters using bcryptjs
      const salt =await bcrypt.genSalt(10);
      const secpassword =await bcrypt.hash(req.body.password , salt);
      
      //Create a new user if the user doesn't exists already
      user = await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email
      });

      const data = {
        user:{            
            id : user.id
        }
      }
      const authToken = jwt.sign(data,TOKEN_SECRET)  //signing id using json webtoken
      res.json({authToken});

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: " Internal error occured" });
    }
  });


//ROUTE-2 : Authenticate a User using: POST " /api/auth/login". No login required
router.post('/login',[
  body('email','Invalid email').isEmail(),
  body('password','Password is needed').exists()
],async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()})
  }

  try {
    const {email , password} = req.body;
    let user = await User.findOne({email});   //Check the user with the same email exists
    if(!user){
      return res.status(400).json({error : "Try to login with correct credentials"});
    }

    // Checking the password using bcryptjs
    const ispasswordCorrect =await bcrypt.compare(password , user.password);
    if(!ispasswordCorrect){
      return res.status(400).json({error : "Please try to login with correct credentials"})
    }
    const data = {
      user : {
        id : user.id
      }
    }
    const authtoken = jwt.sign(data , TOKEN_SECRET);
    res.json({authtoken})
  } catch (error) {
     console.log(error);
     res.status(400).json({error : "Internal error occured"});
  }
});

// ROUTE-3 : get loggedin user details using localhost:api/auth/getuser. -->Login required
router.post('/getuser',fetchUser,async(req,res)=>{
try {
  const userId = req.user.id ; 
  let user = await User.findById(userId).select("-password")  //Select all details of the user ( except password ) having id = userId
  res.send(user)
} catch (error) {
  console.log(error.message);
  res.status(400).json({error : "Internal Server Error"});
}
});

module.exports = router; 
