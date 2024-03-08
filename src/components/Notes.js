import React, { useContext, useEffect, useRef,useState } from 'react'
import contextValue from "../context/notes/noteContext"
import Noteitems from "./Noteitems"
import AddNote from "./AddNote"

export default function Notes() {
    const context = useContext(contextValue);
    const { notes, getNote } = context;
    const [note, SetNote] = useState({ etitle: "", edescription: "", etag: "default" })
    const reference = useRef(null);
    useEffect(() => {
        getNote();
    }, []);

    const updateNote = (currentNote) => {
        reference.current.click();
        SetNote({etitle:currentNote.title , edescription:currentNote.description , etag : currentNote.tag});

    }

    const handleClick = (e) => {
        console.log("Updating the note",note)
        e.preventDefault();
    }
    const onChange = (e) => {
        SetNote({ ...note, [e.target.name]: [e.target.value]});
    }

    return (
        <>
            <AddNote />

            <button type="button" ref={reference} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="row my-3">
                    <h2>Your notes</h2>
                    {notes.map((note) => {
                        return <Noteitems key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}
