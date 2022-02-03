import { useUser } from "../hooks/users"
import { useHistory } from "react-router-dom"

const style ={
    padding: "0.5rem",
    display: "block",
    border: "0.25px solid white",
    borderRadious:"10px",
    color:"white",
    backgroundColor:"red"
} 

export const LogOut = () => {
    const {user,logout} = useUser()
    const history = useHistory()
    const handleLogOut =( )=>{
        logout()
        history.push("/login")
    }

    return (
        <>
            {
                user 
                ?   <button onClick={handleLogOut} style={style}>
                        Log out
                    </button>
                : ""
            }
        
        </>
    )
}