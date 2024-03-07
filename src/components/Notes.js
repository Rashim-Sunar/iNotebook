import React, { useContext, useEffect } from 'react'
import contextValue from "../context/notes/noteContext"
import Noteitems from "./Noteitems"
import AddNote from "./AddNote"

export default function Notes() {
    const context = useContext(contextValue);
    const { notes,getNote} = context;
    useEffect(()=>{
        getNote();
    },[]);
    
    return (
        <>
            <AddNote />
            <div>
                <div className="row my-3">
                    <h2>Your notes</h2>
                    {notes.map((note) => {
                        return <Noteitems key={note._id} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}
