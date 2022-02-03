import { useState, useEffect } from "react"
import { getAll } from "../services/notes"
import { create } from "../services/notes"

export const useNote = () => {
    const [notes,setNotes] = useState([])
    
    useEffect(() =>{
      getAll()
        .then(notes => {
          setNotes(notes)
        })
    },[])

    const addNote = (noteObject) => {
        create(noteObject)
          .then(note => {
              setNotes(prevNotes => prevNotes.concat(note))
          })
              .catch(err => {
              console.error(err)
          })
      }
  
    return{
      notes,
      addNote
    }
  }