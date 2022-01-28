const usersRouter = require ("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

usersRouter.post("/", async (request,response) => {
    try{ 
        const {body} = request
        const {username,name,password} = body
        
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password,saltRounds)
        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }
    catch(err){
        response.status(400).json(err)
    }
})  



usersRouter.get("/", async (request,response) => {
    try{ 
        
        const users = await User.find({}).populate("notes",{
            content:1,
            date:1
        })
        response.json(users)
        
    }
    catch(err){
        response.status(400).json(err)
    }
}) 

module.exports = usersRouter 
 