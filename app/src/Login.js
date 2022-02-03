import { LoginForm } from "./components/loginForm"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import React from "react";
import { useUser } from "./hooks/users";

const errorStyles = {
  border:"1px solid red",
  backgroundColor:"gray",
  color:"red",
  borderRadious:"50px",
  padding: "1rem",
  margin:"0.25rem auto"
}

export const Login = () => {
    const history = useHistory()
    const {login} = useUser()
    const [error, setError] = useState(null);

    

    const handleLogin = (username,password) => {
        login(username,password)
          .then(()=> history.push("/notes"))
          .catch(err => {
            setError(err.response)
            setTimeout(() => {
              setError(null)
            }, 3000);
          })
        
    }

    return(
        <>
          { 
            error
            ?
              <div style={errorStyles}>
                Sorry, {error.data.error}
              </div>
            : ""
          }
          <LoginForm handleLogin={handleLogin}/>
        </>
    
    )
}