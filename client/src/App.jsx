import { Routes, Route } from 'react-router-dom';
import Signup from './pages/singup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { useReducer } from 'react';
import { AuthContext } from './context/authcontext'

const myFunction = ( states, action ) => {

  switch( action.type ) {

    case 'setUser': return { ...states, user: action.payload }
    case 'setLoggedIn': return { ...states, isLoggedIn: action.payload }
    default: throw ( new Error(" Error ") )

  }

}

const App = () => {

  const [ states, dispatch ] = useReducer( myFunction, { user: "", isLoggedIn: false });

  return (
    <AuthContext.Provider value={ { states, dispatch } } >
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </AuthContext.Provider>
  )

}

export default App;