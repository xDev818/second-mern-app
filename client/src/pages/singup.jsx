import { useReducer, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const myFunction = ( states, action ) => {

    switch (action.type) {

        case 'myUsername' : return { ...states, username: action.payload }
        
        case 'myPassword' : return { ...states, password: action.payload }
        
        default: throw( new Error("Error") );
    }

}

const Signup = () => {

    const [ states, dispatch ] = useReducer(myFunction, { username: '', password: '' });

    const formRef = useRef(null);

    const navigate = useNavigate()

    const signupHandler = async () => {

        try {

            const request = await axios.post('/signup', formRef.current);
    
            const response = await request.data;
    
            if(response.message.includes('Registered Successfully')) {

                navigate('/');
            
            }
            
        } catch ( err ) {

            console.log(err)
            
            if( err.name === 'AxiosError' ) {

                if( err?.response ) {

                    alert( err.response.data.message )

                } else {

                    alert( err.message );

                }

            }

        }

    }

    return (
        <>
            <form ref={formRef}>
                <h2> Signup </h2>
                <Link to="/login"> already have an account? </Link>
                <input type="text" name="username" onChange={ ( e ) => dispatch( { type: 'myUsername', payload: e.target.value } ) } value={states.username} placeholder="Username..." />
                <input type="text" name="password" onChange={ ( e ) => dispatch( { type: 'myPassword', payload: e.target.value } ) } value={states.password} placeholder="Password..." />
                <button type="button" onClick={signupHandler}>Signup</button>
            </form>
        </>
    )

}

export default Signup;