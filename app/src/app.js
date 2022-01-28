import React, { useState, useEffect} from "react"
import { Note } from './Note'
import { getAll , create, setToken } from "./services/notes"
import { loginService } from "./services/login"
import { LoginForm } from "./loginForm"
import { CreateNoteForm } from "./createNoteForm"

export const App = props => {
    const [notes,setNotes] = useState([])
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() =>{
      setLoading(true)
      getAll()
        .then(notes => {
          setNotes(notes)
          setLoading(false)
        })
    },[])

    useEffect(()=> {
      const loggedUserJson = window.localStorage.getItem("loggedNotedAppUser")
      if(loggedUserJson){
        const user = JSON.parse(loggedUserJson)
        setUser(user)
        setToken(user.token)
      }

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

    const handleShowAll = () => {
      setShowAll(!showAll)
    }

    const filterImportant = (note) => {
      return note.important === true
    }
    
    const handleLogin = async (username,password) => {
      try {
        const user = await loginService({
          username,
          password
        })
        setUser(user)
        setToken(user.token)
        window.localStorage.setItem(
          "loggedNotedAppUser", JSON.stringify(user)
        )
      } catch (err) {
        console.log(err)
        setTimeout(()=> {
          console.log("mensaje de error")
        },3000)
      }
    }

    const handleLogOut = () => {
      setUser(null)
      setToken(null)
      window.localStorage.removeItem("loggedNotedAppUser")

    }

    return (
      <div>
        <h1>Notes</h1>
        {
          user 
          ? <button 
            onClick={handleLogOut}
            style={{backgroundColor:"red",color:"white"}}
          >Log out</button>
          : ""
        }
        
        { 
          !user 
          ? <LoginForm handleLogin={handleLogin}/>
          : <CreateNoteForm addNote={addNote}/>
        }
        <button onClick={handleShowAll}>
          {showAll ? "show only important" : "show All"}
        </button>

        { loading ? "Cargando..." : ""}
        <ol>
          {   
            showAll 
            ? notes.map(note => <Note key={note.id} {...note} />) 
            : notes.filter(filterImportant).map(note => <Note key={note.id} {...note} />) 
          }
        </ol>
      </div>
    )
  } 