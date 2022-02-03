import { useEffect , useState } from "react";
import { setToken } from "../services/notes";
import { loginService } from "../services/login";
import { getUsers } from "../services/users";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [listOfUsers,setListOfUsers] = useState([])

    useEffect(()=> {
      const loggedUserJson = window.localStorage.getItem("loggedNotedAppUser")
      if(loggedUserJson){
        const user = JSON.parse(loggedUserJson)
        setUser(user)
        setToken(user.token)
      }
    },[])

    useEffect(()=> {
      getUsers()
        .then(users => {  
          setListOfUsers(prev => users)
          console.log(listOfUser)
        })
        .catch(err => {return {err}})
    },[])

    const logout = () => {
      setUser(null)
      setToken(null)
      window.localStorage.removeItem("loggedNotedAppUser")
    }

    const login = (username,password) => { 
      return loginService({
              username,
              password
            })
            .then(user => {
              setUser(user)
              setToken(user.token)
              window.localStorage.setItem(
                "loggedNotedAppUser", JSON.stringify(user)
              )
            })
    
    }
  
    return{
      user,
      listOfUsers,
      logout,
      login
    }
  }