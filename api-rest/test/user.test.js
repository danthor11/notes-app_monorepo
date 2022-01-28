
const bcrypt = require("bcrypt")
const User = require("../models/User")
const {api ,getUsers} = require("./helpers")
const {server} = require("../index")

describe('Test USer', () => {
    beforeEach(async () => {
        await User.deleteMany()
        const passwordHash = await bcrypt.hash("pswd",10)
        const user = new User({ 
            username:"danthor-root",
            passwordHash
        })
  
        await user.save() 
    }) 
 
    test("works as expected creating a fresh username", async ()=> {
        
        const usersAtStart = await getUsers()
        const newUser = {
            username:"daniel21",
            name:"daniel",
            password:"twitch1"
        }
    
        await api 
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type",/application\/json/)
        
        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
 
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    },100000)  
    
    test("Cant create a new user with same username",async ()=> {

        const usersAtStart = await getUsers()
        const newUser = {
            username:"danthor-root",
            name:"prueba",
            password:"twsitch1"
        }
        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type",/application\/json/)
           
   
        expect(result.body.errors.username.message).toContain("`username` to be unique")
          
        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    },100000) 
   
    afterAll(()=>{ 
        server.close()
    })  
});
     
    
     