
import {Togglable} from "./Togglable";
import { useState } from "react";

export const LoginForm = ({handleLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    
    const handlerUsername = (event) => {
      setUsername(event.target.value)
    }
    
    const handlePassword = (event) => {
      setPassword(event.target.value) 
    }

    const handleSubmit = (event) => {
        event.preventDefault() 
        handleLogin(username,password)
        setUsername("")  
        setPassword("") 
    }


    return (
      <Togglable message={"Show Login"}>
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              name="username"
              value={username}
              placeholder="Username..."
              onChange={handlerUsername}
              type="text"
              required
            />
          </div>
          <div>
            <input 
              name="password"
              value={password}
              placeholder="Password..."
              onChange={handlePassword}
              type="password"
              required
            />
          </div>
          <div>
            <button>Log in</button>
          </div>
        </form> 
      </Togglable>
    )
}

