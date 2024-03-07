import React, { useState } from "react";
import noteContext from "./noteContext";

const noteState = (props) => {
  const host = "http://localhost:8000"
  const notesInitial = [ ]
  const [notes, SetNotes] = useState(notesInitial);

   //Get all Notes
 const getNote = async() => {
  const response = await fetch(`${host}/api/notes/getnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjc2NmVlOTBmNTk4ODJjOTM2MGE1In0sImlhdCI6MTcwODg5NjA2N30.eO5PL_ZOMNsRi8cOK4sbFGCMELBceFT2jgY4XXCRz1E'
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
      body: JSON.stringify({title,description,tag}),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjc2NmVlOTBmNTk4ODJjOTM2MGE1In0sImlhdCI6MTcwODg5NjA2N30.eO5PL_ZOMNsRi8cOK4sbFGCMELBceFT2jgY4XXCRz1E'
      }
    });

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

  //Delete a n0te 
  const deleteNote = (id) => {
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id != id });
    SetNotes(newNotes);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'POST',
      body: JSON.stringify({title,description,tag}),
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjc2NmVlOTBmNTk4ODJjOTM2MGE1In0sImlhdCI6MTcwODg5NjA2N30.eO5PL_ZOMNsRi8cOK4sbFGCMELBceFT2jgY4XXCRz1E"
      }
    });
    const json = response.json();

    //Editing a note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes.title = title;
        notes.description = description;
        notes.tag = tag;
      }
    }

  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default noteState;