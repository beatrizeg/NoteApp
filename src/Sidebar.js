import React from 'react';

export default function Sidebar(props) {
    console.log(props.notes)
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div className="sidebar--note" onClick={() => props.setCurrentNoteId(note.id)}>
                <h4>{note.body.split("\n")[0]}</h4>
                <button className="sidebar--trash" onClick={(event) => props.deleteNote(event, note.id)}><i className="fa-solid fa-trash-can trash-icon"></i></button>
            </div>
        </div>
    ))
    return(
        <div className="sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.createNote}><i className="fa-solid fa-plus plus-icon"></i></button>
            </div>
            {noteElements}
        </div>
    )
}