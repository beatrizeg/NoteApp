import React from 'react';

export default function Editor({ currentNote, updateNote }) {

    return(
        <div className="editor">
            <p className="editor-title">Enter your note below</p>
            <form className="editor-form">
                <textarea className="editor-textarea"
                    cols="50"
                    rows="10"
                    maxLength="400"
                    value={currentNote.body}
                    onChange={(e) => updateNote(e.target.value)}
                    name="note"
                />
            </form>
        </div>
    )
}