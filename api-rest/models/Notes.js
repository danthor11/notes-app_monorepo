const mongoose = require("mongoose")
const Schema = mongoose.Schema
const model = mongoose.model


const schema = new Schema({
    content: String,
    date: Date,
    important: Boolean,
    user : {
        type:Schema.Types.ObjectId,
        ref: "user"
    }
})

schema.set("toJSON",{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = model("note", schema) 

module.exports = Note

