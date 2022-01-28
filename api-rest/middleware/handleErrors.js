const ERRORS_HANDLERS  = {
    CastError: res => res.status(400).send({error:"id used is malformed"}),
    
    ValidationError: (res,{message}) => res.status(409).send({error:message}),
    
    JsonWebTokenError: res => res.status(401).send({error:"token missing or invalidf"}),
    
    defaultError : res => res.status(500).end(),

    TokenExpirerError: res => 
        res.status(401).json({error:"token expired"})
}


module.exports = (error,request,response,next)=>{
    console.log(error)
    const handler = ERRORS_HANDLERS[error.name] || ERRORS_HANDLERS.defaultError

    handler(response,error)
}  