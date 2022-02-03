
import { useUser } from "../hooks/users"



export const Users = () => {
    const {listOfUsers} = useUser()
    console.log(listOfUsers)
    return (
        <>
            <h1>Users</h1>

            {
                listOfUsers
                ?
                listOfUsers.map(user => <ListOfUser key={user.id} {...user}/>)
                :""
            }

        </>
    )
}

const ListOfUser = ({name,username,notes}) => {
    console.log(notes)
    return (
        <>
            <h3>{name}</h3>
            <p><em>{username}</em></p>
        </>
    )
}