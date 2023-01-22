import React from 'react';
import {nanoid} from 'nanoid';

import './App.css';
import Editor from './Editor'
import Sidebar from './Sidebar'

function App() {

  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || [])

  const [currentNoteId, setCurrentNoteId] = React.useState((notes[0] && notes[0].id) || "")

  React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "Type..."
    }
    setNotes(prevState => [newNote, ...prevState])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    setNotes(prev => {
      const newArray=[]
      for (let i=0; i<prev.length; i++) {
        const oldNote = prev[i]
        if (oldNote.id === currentNoteId) {
          newArray.unshift({...oldNote, body: text})
        } else {
          newArray.push(oldNote)
        }
      }
      return newArray
    })
  }

  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(prev => prev.filter(note => note.id !== noteId))
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
    <div className="App">
      { 
        notes.length > 0
        ?
        <div className="general">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            createNote={createNewNote}
            deleteNote={deleteNote}
          />
          {
            currentNoteId && notes.length > 0 &&
            <Editor
              currentNote={findCurrentNote()}
              updateNote={updateNote}
            />
          }
        </div>
        :
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button 
              className="first-note" 
              onClick={createNewNote}
          >
              Create one now
          </button>
        </div>
      }
        
    </div>
  );
};

export default App;
