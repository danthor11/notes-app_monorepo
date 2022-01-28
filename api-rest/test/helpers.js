const supertest = require("supertest")
const {app}= require("../index")
const api = supertest(app)
const User = require("../models/User")

const initialNotes = [
    {
        content: "Aprendiendo Fullstack",
        important:true,
        date:new Date()
    }
    ,
    {
        content: "Aprendiendo Backend",
        important:true,
        date:new Date()
    }
]

const getAllContents = async () => {
    const response = await api.get("/api/notes")
    return {
        contents: response.body.map(note => note.content),
        response

    }
}


const getUsers = async () => {
    const usersDBAfter = await User.find({})
    return await usersDBAfter.map(user => user.toJSON())
}


module.exports ={ 
    initialNotes,
    api,
    getAllContents,
    getUsers
} 