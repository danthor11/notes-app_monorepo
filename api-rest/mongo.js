require("dotenv")
const {MONGO_DB_URI,MONGO_DB_URI_TEST, NODE_ENV} = process.env
const mongoose = require("mongoose")
const connectionString = NODE_ENV === "test"
    ? MONGO_DB_URI_TEST
    : MONGO_DB_URI


mongoose.connect(connectionString,{
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
    .then(()=> console.log("Database Connected"))
    .catch(err => {
        
    })


module.exports=mongoose