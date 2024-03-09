import React, { useState } from "react";
import noteContext from "./noteContext";

const noteState = (props) => {
  const host = "http://localhost:8000"
  const notesInitial = []
  const [notes, SetNotes] = useState(notesInitial);

  //Get all Notes
  const getNote = async() => {
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjc2NmVlOTBmNTk4ODJjOTM2MGE1In0sImlhdCI6MTcwOTg0OTg4OH0.o4kILh27x1hNHUFc0c6-zqT_b_Ko23mpGOqBg2GAlMI'
      }
    });
    const json = await response.json();
    SetNotes(json);
    console.log(json);
  }
  //Add a Note
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      body: JSON.stringify({ title, description, tag }),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjc2NmVlOTBmNTk4ODJjOTM2MGE1In0sImlhdCI6MTcwOTg0OTg4OH0.o4kILh27x1hNHUFc0c6-zqT_b_Ko23mpGOqBg2GAlMI'
      }
    });
    const json =  await response.json();
    console.log(json);
    console.log("Adding a new note");
    const note = {
      "_id": "65dd2fc2ef8342423d0b70d51daf14fd8",
      "user": "65db766ee90f59882c93fda60a5",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-02-27T00:41:35.678Z",
      "__v": 0
    }
    SetNotes(notes.concat(note));
  }

  //Delete a note 
  const deleteNote = async(id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjc2NmVlOTBmNTk4ODJjOTM2MGE1In0sImlhdCI6MTcwOTg0OTg4OH0.o4kILh27x1hNHUFc0c6-zqT_b_Ko23mpGOqBg2GAlMI"
      }
    });
    const json =await response.json();
    console.log(json);
    console.log("Deleting the note with id" + id);
    const newNotes =await notes.filter((note) => { return note._id != id });
    SetNotes(newNotes);
  }

  //Edit a Note
  const editNote = async(id, title, description, tag) => {
    try {
     //API CALL
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      body: JSON.stringify( {title, description, tag} ),
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjc2NmVlOTBmNTk4ODJjOTM2MGE1In0sImlhdCI6MTcwOTg0OTg4OH0.o4kILh27x1hNHUFc0c6-zqT_b_Ko23mpGOqBg2GAlMI"
      }
     
    });
    const json = await response.json();
    console.log(json);
    console.log("Data fetched")

    let newNotes =JSON.parse(JSON.stringify(notes));
    //Editing a note
    for (let index = 0; index < newNotes.length; index++){
      let element = newNotes[index];
      if (element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
 
    SetNotes(newNotes);

    } catch (error) {
      console.error("Error updating the note",error);
    }


  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default noteState;