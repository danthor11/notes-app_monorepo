const jwt = require("jsonwebtoken");

module.exports = (request,response,next) => {
    const authorization = request.get("authorization")
    let token = ""

    if(authorization && authorization.toLowerCase().startsWith("bearer"))
        token = authorization.substring(7)
    
    let decodedToken=""
    try {
        decodedToken = jwt.verify(token,process.env.VERIFY_SIGNATURE)
        request.userId = decodedToken.id
        next()
    } catch (error) {
        next(error)
    }
    
}