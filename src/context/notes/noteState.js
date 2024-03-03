import React,{useState} from "react";
import noteContext from "./noteContext";

const noteState = (props) => {
     const notesInitial = [
        {
          "date": "2024-03-03T16:26:16.842Z",
          "_id": "65dbaf7e3ed3e13cf8ad69df",
          "user": "65db766ee90f59882c9360a5",
          "title": "mytitle",
          "description": "This is my story",
          "tag": "lovestory",
          "__v": 0
        },
        {
          "date": "2024-03-03T16:26:16.842Z",
          "_id": "65dbaf823ed3e13cf8ad69e1",
          "user": "65db766ee90f59882c9360a5",
          "title": "mytitle",
          "description": "This is my story",
          "tag": "lovestory",
          "__v": 0
        },
        {
          "date": "2024-03-03T16:26:16.842Z",
          "_id": "65dbaf833ed3e13cf8ad69e3",
          "user": "65db766ee90f59882c9360a5",
          "title": "mytitle",
          "description": "This is my story",
          "tag": "lovestory",
          "__v": 0
        },
        {
          "_id": "65dd2fc2ef8d0b70d5114fd8",
          "user": "65db766ee90f59882c9360a5",
          "title": "mytitle",
          "description": "This is my story",
          "tag": "lovestory",
          "date": "2024-02-27T00:41:35.678Z",
          "__v": 0
        }
      ]
    const [notes ,SetNotes]= useState(notesInitial);

    return(
        <noteContext.Provider value = {{notes,SetNotes}}>
           { props.children}
        </noteContext.Provider>
    )
}

export default noteState;