

import {Link, BrowserRouter ,Route ,Switch} from 'react-router-dom'
import {Notes} from "./Notes"
import { NoteDetail } from './components/noteDetail'
import { Login } from './Login'
import { Redirect } from 'react-router-dom'
import { useUser } from './hooks/users'
import { useNote } from './hooks/notes'
import { Users } from './components/listOfUser'
import { Button } from 'react-bootstrap'

const Home = () => <h1>Home</h1>
 

const styleInLine = {
  padding:5
}



export const App = () => {
  const {user} = useUser()
  
  const {notes} = useNote()
  
  
  return( 
    <div className='container'>
    <BrowserRouter>
    <Button >Primary</Button>
      <header>
        <Link to="/"  style={styleInLine}>Home</Link>
        <Link to="/notes"  style={styleInLine}>Notes</Link>
        <Link to="/users" style={styleInLine}>Users</Link>

        {
          user 
          ? <em>Logged as <strong>{user.username}</strong></em>
          : (<Link to="/login" style={styleInLine}>Login</Link>  )
        }
      </header>
    
      <Switch>
        <Route path="/notes/:id" >
          <NoteDetail notes={notes}></NoteDetail>
        </Route>
        <Route path="/notes">
          <Notes/>
        </Route>
        <Route path="/users" >
          <Users/>
        </Route>
        <Route path="/login" render={()=> {
          return user!==null ? <Redirect to={"/"}/>: <Login/>
        }}/>   
        <Route path="/" >
          <Home/>
        </Route>
      </Switch>
      
    </BrowserRouter>
    </div>
  )
}