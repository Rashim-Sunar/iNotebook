import React, { useContext } from 'react'
import contextValue from "../context/notes/noteContext"
import Noteitems from "./Noteitems"

export default function Notes() {
    const context = useContext(contextValue);
    const { notes, setNotes } = context;
    return (
        <div>
            <div className="row my-3">
                <h2>Your notes</h2>
                {notes.map((note) => {
                    return <Noteitems note={note}/>
                })}
            </div>
        </div>
    )
}
