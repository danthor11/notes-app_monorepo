require("dotenv").config()
require("./mongo")

const express = require("express")
const app= express()
const notFound = require("./middleware/notFound")
const handleErrors = require("./middleware/handleErrors")
const cors = require("cors")
const usersRouter = require("./controllers/users")
const notesRouter = require("./controllers/notes")
const loginRouter = require("./controllers/login")

// Uso del middlewarea para formatear con Json
//Uso del cors para permitir compartir datos
app.use(express.json())
app.use(cors())


app.use(express.static("../app/build"))

//  Rutas de notas
app.use("/api/notes",notesRouter)
app.use('/api/notes/', notesRouter) 
app.use('/api/notes/', notesRouter)
app.use("/api/notes/",notesRouter)
app.use("/api/notes", notesRouter)

//      Ruta de usuarios
app.use("/api/users",usersRouter)
//      Ruta del Login
app.use("/api/login",loginRouter)

app.use(notFound)
app.use(handleErrors)


const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = {app,server}