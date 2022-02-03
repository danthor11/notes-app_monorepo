import React, { useState} from "react"
import { Note } from './components/Note'
import { CreateNoteForm } from "./components/createNoteForm"
import { useNote } from "./hooks/notes"
import { LogOut } from "./components/Logout"
import { useUser } from "./hooks/users"
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "react-bootstrap"
import   Button  from "react-bootstrap/Button"

export const Notes = props => {
    const {notes,addNote} = useNote()
    const {user} = useUser()
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(true);
    console.log(notes)
    
    const addNewNote = (newNote)=> {
      addNote(newNote)
    }

    const handleShowAll = () => {
      setShowAll(!showAll)
    }

    const filterImportant = (note) => {
      return note.important === true
    }
    

    return (
      <div>
        <h1>Notes</h1>

        {
          user
          ? <CreateNoteForm addNote={addNewNote}/>
          : ""
        }
        
        
        <LogOut/>
      
        <button onClick={handleShowAll}>
          {showAll ? "show only important" : "show All"}
        </button>

        { loading ? "Cargando..." : ""}


        <ol className="table responsive">
          {   
            showAll 
            ? notes.map(note => <Note key={note.id} {...note} />) 
            : notes.filter(filterImportant).map(note => <Note key={note.id} {...note} />) 
          }
        </ol>

        

      </div>
    )
  } 