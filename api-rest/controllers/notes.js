const express = require("express")
const notesRouter = express.Router()
const Note = require("../models/Notes")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const userExtractor = require("../middleware/userExtractor")

notesRouter.get("/", async (request,response) => {
    const notes = await Note.find({}).populate("user",{
        username:1,
        name:1
    }) 
    response.json(notes) 
})


notesRouter.get('/:id', (request,response,next) => {
    const id = request.params.id
    
    Note.findById(id)
        .then(note => {
            if(note)
                return response.json(note)
            else
                response.status(404).end()
        })
        .catch(err => {
            next(err)
            console.log("next")
        })
}) 

notesRouter.delete('/:id', userExtractor , async (request,response,next) => {
    const {userId} = request
    const {id:noteId} = request.params


    try {
        console.log(userId)
        const user = await User.findById(userId)
        const res = await Note.findByIdAndRemove(noteId)

        console.log(res)
        console.log(user)
        
        const newList = user.notes.filter(note => {
            console.log(note.toString() !== noteId.toString())
            if(note.toString()!== noteId.toString())
                return note
        })
        console.log(newList.length,user.notes.length)
        user.notes=newList
        user.save()
        

        response.status(200).json(user).end()
    } catch (error) {
        next(error)
    }
})

notesRouter.put("/:id", userExtractor, async (request,response,next) => {
    
    const {userId}= request
    const {content,important} = request.body
    const {id} = request.params


    if(!content){
        response.status(400).json({
            error: "Content missing"
        })
    }

    const newNoteInfo = {
        content,
        important
    } 
 
    try{
        const puttedNoted = await Note.findByIdAndUpdate(id,newNoteInfo,{returnDocument:"after"})
        console.log(puttedNoted)
        const user = await User.findById(userId)
        console.log(user)
        user.notes.forEach(note =>{
            if(note.id===id){
                 content,
                 important
            }
        })
        user.save()
        response.status(201).json(puttedNoted)
    }
    catch(err){
        next(err)
    }

    
})



notesRouter.post("/", userExtractor, async (request,response,next) => {
    const {
        content,
        important=false
    } = request.body
    const {userId}= request

    const user = await User.findOne({userId})

    if(!content ){
        return response.status(400).json({
            error: "Content missing"
        })    
    }
  
    const newNote  = new Note({
        content,
        date: new Date(),
        important,
        user: user._id
    }) 

    try{
        
        const savedNote = await newNote.save()
        user.notes = user.notes.concat(savedNote._id)
        console.log(user)
        res = await user.save({validateModifiedOnly:true})
        console.log(res)
        response.json(savedNote)
    }
    catch(err){
        next(err)
    }
})


module.exports = notesRouter