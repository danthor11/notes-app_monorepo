const supertest = require("supertest")
const {server }= require("../index")
const moongose = require("mongoose")
const Note = require("../models/Notes")
const {initialNotes,api,getAllContents} = require("./helpers")





beforeEach(async()=> {

    await Note.deleteMany()
    /*
    const noteObjects = initialNotes.map ( note => new Note(note))
    const promises = noteObjects.map(note=> note.save())
    await Promise.all(promises)
*/ 
    for (const note of initialNotes) {
        const noteObject = new Note(note)
        await noteObject.save()
    }
   

})

describe('Get All notes', () => {
    test("notes are returne as json", async () => {
        await api
            .get("/api/notes")
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

     /*
    test("there are four notes", async () => {
        const {response} = await getAllContents()
        expect(response.body).toHaveLength(initialNotes.length)
    })
    */ 

   test("first note es is aprendiendo fullstack", async () => {
       const {contents} = await getAllContents()
       expect(contents).toContain("Aprendiendo Fullstack")
   })  
});








describe('Post create a note', () => {
    test("valid note", async ()=>{
        const newNote = {
            content : "proximamente async",
            important: true
            }   
            await api 
                .post("/api/notes")
                .send(newNote)
                .expect(200)
                .expect("Content-type",/json/)
    
            
            const {contents,response} = await getAllContents()
        
            expect(response.body).toHaveLength(initialNotes.length+1)
            expect(contents).toContain(newNote.content)
    })
      
    test("invalid note", async ()=>{
        const newNote = {
                important: true
            }   
            await api 
                .post("/api/notes")
                .send(newNote)
                .expect(400)
    
            const {response} = await getAllContents()
            expect(response.body).toHaveLength(initialNotes.length)
    })
});

 
describe('Delete delete a note ', () => {
    test("a note can be delete", async () => {
        const {response:firstResponse} = await getAllContents()
        const notes = firstResponse.body
        const noteToDelete =notes[0]
        await api 
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)
    
        const {contents, response:sencondResponse} = await getAllContents()
    
        expect(sencondResponse.body).toHaveLength(initialNotes.length - 1)
        expect(contents).not.toContain(noteToDelete.content)
    })  
    
    
    test("a note can not be delete", async () => {
        await api
            .delete("/api/notes/12324")
            .expect(400)
     
        const {response} = await getAllContents()
        expect(response.body).toHaveLength(initialNotes.length)
    })  
});

 
describe('PUT update a note',  () => {
    test("Update the containing", async () =>{
        const {response} = await getAllContents()
        const note = response.body[0]


        await api
            .put(`/api/notes/${note.id}`)
            .send({
                content: "Update Text",
                date:note.date,
                important: note.important
            })
            .expect(200)
        const {response: update} = await getAllContents()  
        const notesUpdate = update.body[0]

        expect(notesUpdate.content).toEqual(expect.not.stringContaining(note.content))
    } )

    test("Update the important", async ()=> {
        const {response} = await getAllContents()
        const note = response.body[0]

        await api
            .put(`/api/notes/${note.id}`)
            .send({
                content: note.content,
                date:note.date,
                important: !note.important
            })
            .expect(200)
        
        const {response: update} = await getAllContents()  
        const notesUpdate = update.body[0]

        expect(notesUpdate.important).not.toEqual(note.important)
    }) 
       
    test("Cant Update note", async ()=> {
        const newNote = {
            content: "ashgdiashd",
            date:new Date(),
            important: false
        }
        await api
            .put(`/api/notes/1234`)
            .send(newNote)
            .expect(400)
        
        const {response: update} = await getAllContents()  
        const notes = update.body
        
        expect(notes).not.toContain(newNote)

    })

     
});


    
afterAll(()=>{
    
    server.close()

})  