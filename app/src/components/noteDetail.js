import React from "react"
import { useParams } from "react-router-dom"

export function NoteDetail({notes}) {
  const {id } = useParams()
  const note = notes.find(note => note.id===id)
  return (
      <div>
        <h2>{note.content}</h2>
        <h3>{note.username}</h3>
        <div>
          <strong>
            {note.importantBtn ? "Make not important" : "Make Important"}
          </strong>
        </div>
        <small>{note.date}</small>
      </div>
  )
}