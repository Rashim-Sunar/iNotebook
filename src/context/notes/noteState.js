import React,{useState} from "react";
import noteContext from "./noteContext";

const noteState = (props) => {
     const notesInitial = [
        {
          "date": "2024-03-03T16:26:16.842Z",
          "_id": "65dbaf7e3ed3e13cf8ad6387349df",
          "user": "65db766ee90f59882c9360a5",
          "title": "mytitle",
          "description": "This is my story Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, nihil?Lorem ipsum dolor sitlore Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, numquam. ",
          "tag": "lovestory",
          "__v": 0
        },
        {
          "date": "2024-03-03T16:26:16.842Z",
          "_id": "65dbaf823ed3e13cf8ad4389802269e1",
          "user": "65db766ee90f59882c9360a5",
          "title": "mytitle",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum harum quasi error, expedita officiis voluptatum perferendis. Eum hic ratione iure.This is my story",
          "tag": "lovestory",
          "__v": 0
        },
        {
          "date": "2024-03-03T16:26:16.842Z",
          "_id": "65dbaf833ed3e13cf8ai32983232423d69e3",
          "user": "65db766ee90f59882c9360a5",
          "title": "mytitle",
          "description": " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos facere vel fugit nihil neque ipsam laborum laudantium consectetur dolorum voluptatibus.This is my story",
          "tag": "lovestory",
          "__v": 0
        },
        {
          "_id": "65dd2fc2ef8342423d0b70d5114fd8",
          "user": "65db766ee90f59882c9360a5",
          "title": "mytitle",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, iste doloremque in odio modi velit inventore. Molestiae aliquid perferendis doloribus. This is my story",
          "tag": "lovestory",
          "date": "2024-02-27T00:41:35.678Z",
          "__v": 0
        }
      ]
    const [notes ,SetNotes]= useState(notesInitial);

    //Add a Note
      const addNote =(title,description,tag)=>{
        console.log("Adding a new note");
        const note =  {
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
    //Delete a nNte 
      const deleteNote = () =>{

      }
    //Edit a Note
      const editNote = () =>{

      }

    return(
        <noteContext.Provider value = {{notes,addNote,deleteNote,editNote}}>
           { props.children}
        </noteContext.Provider>
    )
}

export default noteState;