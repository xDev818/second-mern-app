import { useEffect, useReducer, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const myFunction = ( states, action ) => {

    switch (action.type) {

        case 'myUsername' : return { ...states, username: action.payload }
        
        case 'myPassword' : return { ...states, password: action.payload }
        
        default: throw( new Error("Error") );
    }

}

const Login = () => {

    const [ states, dispatch ] = useReducer(myFunction, { username: '', password: '' });

    const formRef = useRef(null);

    const navigate = useNavigate()

    const loginHandler = async () => {

        try {

            const request = await axios.post('/login', formRef.current, {
                headers: {
                    Authorization: `Bearer=${localStorage.getItem('token')}`
                }
            });
    
            const response = await request.data;
    
            if(response.message.includes('Logged In Successfully')) {

                localStorage.setItem('mernTokenApp2ndMern', response.token)
                
                alert(response.message);

                navigate('/dashboard');
            
            }

            
        } catch ( err ) {
            
            if( err.name === 'AxiosError' ) {

                if( err?.response ) {

                    alert( err.response.data.message )

                } else {

                    alert( err.message );

                }

            }

        }

    }

    useEffect( () => {

        if(localStorage.getItem('mernTokenApp2ndMern')) {    
            
            navigate('/dashboard')
        
        } else {
            false;
        }


    }, [])

    return (
        <>
            <form ref={formRef}>
                <h2> Login </h2>
                <Link to="/signup"> Dont have an account yet?</Link>
                <input type="text" name="username" onChange={ ( e ) => dispatch( { type: 'myUsername', payload: e.target.value } ) } value={states.username} placeholder="Username..." />
                <input type="text" name="password" onChange={ ( e ) => dispatch( { type: 'myPassword', payload: e.target.value } ) } value={states.password} placeholder="Password..." />
                <button type="button" onClick={loginHandler}>Login</button>
            </form>
        </>
    )

}

export default Login;