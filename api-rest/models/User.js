const mongoose = require("mongoose")
const Schema = mongoose.Schema
const model = mongoose.model
const uniqueValidator = require("mongoose-unique-validator")


const userSchema = new Schema({       
    username: {type: String,unique:true},
    name: String,
    passwordHash: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'note'
    }]
})

userSchema.set("toJSON", {
    transform: (document,returnedObject)=> {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v   
        delete returnedObject.passwordHash
    }
}) 

userSchema.plugin(uniqueValidator)

const User = model("user", userSchema) 
 
module.exports= User


 