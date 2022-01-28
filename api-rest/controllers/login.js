const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
 

loginRouter.post("/", async (request,response) => {
    const {body} = request

    const {
        username,
        password
    } = body

    const user = await User.findOne({username})

    const correctPassword = user===null
        ?  false
        :  await bcrypt.compare(password,user.passwordHash)

    if(correctPassword && user){

        const userForToken= {
            id: user.id,
            username:user.username
        }

        const token = jwt.sign(
            userForToken,
            process.env.VERIFY_SIGNATURE,
            {
                expiresIn: 60 * 60 * 24 * 7
            }
        )

        response.send({
            id: user._id,
            username:user.username,
            token
        })
    }
    else{
        response.status(401).json({
            error:"invalid user or password"
        })
    }
})


module.exports=loginRouter