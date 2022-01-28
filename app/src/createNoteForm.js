import { Togglable } from "./Togglable"
import { useState  , useRef} from "react"

export const CreateNoteForm = ({addNote}) => {
    const [newNote,setNewNote] = useState("") 
    const elementRef = useRef()
    const handlerSubmit = (event) => {
        event.preventDefault()
        const noteObject = {
            content:newNote,
            important: Math.random() >0.5
        }
        setNewNote("") 
        elementRef.current.toggleVisibility()
        addNote(noteObject)    
      }

    const handlerChange = (event) => {
        setNewNote(event.target.value)  
    } 

    console.log(elementRef)

    return(
        <Togglable  ref={elementRef}>
            <h3 >Create a new note</h3>
            <form onSubmit={handlerSubmit}>
                <input 
                    type="text" 
                    placeholder="Write a note..."
                    onChange={handlerChange} 
                    value={newNote}>
                </input>
                <button >Save Note</button>
            </form>
        </Togglable>
    )
}