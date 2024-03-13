import React, { useContext, useState } from 'react'
import contextValue from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(contextValue);
    const { addNote } = context;
    const [note, SetNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        SetNote({title:"",description:"",tag:""})
        props.showAlert("Note added succesfully","success");
    }

    const onChange = (e) => {
        SetNote({ ...note, [e.target.name]: e.target.value });  // ... is spread operator 
    }

    return (
        <>
            <div className="container my-3">
                <h2>Add a note</h2>
                {/* Form validationn */}
                <form>
                    <div className="mb-3 mt-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
