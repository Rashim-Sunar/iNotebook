const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const {body,validationResult} = require('express-validator')

// Router-1 : Get all the notes using: GET "/api/notes/getnotes". Login required
router.get('/getnotes',fetchUser,async(req,res)=>{
    try{
    const notes = await Notes.find({user: req.user.id})
    res.json(notes)
    }catch(error){
        console.log(error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
});

//ROUTE-2 : Add new notes using: POST "api/notes/addnotes". Login required
router.post('/addnotes',fetchUser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must contain atleast 5 characters').isLength({min:5}),
],async(req,res)=>{
    try{
    const {title , description, tag} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const notes = new Notes({
        title,description,tag,user:req.user.id
    })
    const savednotes = await notes.save();
    res.json({savednotes});
    }catch(error){
        console.log(error.message);
        res.status(500).json({error:"Internal Server Error"})
    }

})
module.exports = router
