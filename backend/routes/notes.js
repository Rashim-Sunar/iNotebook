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
});

//ROUTE-3 : Update an existing note using : PUT"api/notes/updatenotes". Login required
router.put('/updatenotes/:id',fetchUser,async(req,res)=>{
    try{
    const {title , description , tag} = req.body;
    //Create a newNote object
    const newNote = {}
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and then update it
    let note =await Notes.findById(req.params.id)    //req.params.id is the id fetched from /updatenotes/:id<--
    if(!note){
        return res.status(404).send("Note not Found");
    }

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Access denied!");
    }

    note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new:true});
    res.json({note});
    }catch(error){
    console.log(error.message);
    res.status(500).json({error : "Internal Server Error"});
    }
});

// ROUTE-4 : Delete a note using : DELETE "api/notes/deltenotes ". Login required.
router.delete('/deletenotes/:id',fetchUser,async(req,res)=>{
    // Find the note to be deleted and delete it
    try{
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Note not found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Access denied!");
    }

    }catch(error){
        console.log(error.message);
        res.status(500).json({error:"Internal Server Error"});
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted", note : note});
});

module.exports = router
