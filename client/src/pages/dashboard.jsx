import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import decoder from 'jwt-decode'

const Dashboard = () => {

    const [ user, setUser ] = useState();

    const tableRef = useRef(null);

    const navigate = useNavigate(); //make add to cart handler and get cart show list handler

    const addToCartButton = async ( e ) => {

        const values = {
            id: user?._id,
            name: e.currentTarget.parentElement.querySelector('.title').textContent
        }

        try {

            const request = await axios.post('/add-cart', values);

            const response = await request.data;

            alert(response.message)

        } catch ( err ) {

            if( err.name === 'AxiosError' ) {

                if( err?.response ) {

                    alert( err.response.data.message )

                } else {

                    alert( err.message )

                }

            }

        }

    }

    const showMyCartButton = async () => {

        const id = { id: user?._id }

        try {

            const request = await axios.post('/get-user-cart', id );

            const response = await request.data;

            if(response?.my_items) {

                response.my_items.forEach(item => {

                    console.log(item.item_name)
                    alert(item.item_name)

                })

            }

        } catch ( err ) {

            if( err.name === 'AxiosError' ) {

                if( err?.response ) {

                    alert( err.response.data.message )

                } else {

                    alert( err.message )

                }

            }

        }

    }

    const logoutButton = async () => {

        localStorage.removeItem('mernTokenApp2ndMern');

        navigate('/')

        // try {

        //     const request = await axios.get('/logout');

        //     const response = request.data;

        //     if(response?.message) {

        //         alert( response.message )

        //         navigate('/');

        //     }

        // } catch ( err ) {

        //     if( err.name === 'AxiosError' ) {

        //         if( err?.response ) {

        //             alert( err.response.data.message )

        //         } else {

        //             alert( err.message )

        //         }

        //     }

        // }

    }

    useEffect( () => {

        axios.get('/dashboard', {
            headers: {
                Authorization: `Bearer=${localStorage.getItem('mernTokenApp2ndMern')}`
            }
        })

        .then(res => {

            const { newToken } = res.data;

            const decoded = decoder(newToken)

            setUser(decoded)

        })

        .catch( err => {

            if( err.name === 'AxiosError' ) {

                if( err?.response ) {

                    alert( err.response.data.message )
                    navigate('/')

                } else {

                    alert( err.message + `: You will be redirected to login page` )
                    navigate('/')

                }

            }

        })

    }, [setUser])

    return (
        <>
            
            <div className="user-wrapper">

                <h1> Welcome to dashboard</h1>
                <button type="button" className="show-list" onClick={showMyCartButton}>Show Cart List</button>
                <button type="button" className="show-list" onClick={logoutButton}>Logout</button>
                <table ref={tableRef}>
                    <tbody>
                        <tr>
                            <th> id </th>
                            <th> username </th>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="id"> { user?._id } </td>
                            <td> { user?.username } </td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <hr />

            <div className="items">
                <div className="boxes">
                    <p className="title">Apple</p>
                    <button type="button" onClick={addToCartButton}>Add To Cart</button>
                </div>
                <div className="boxes">
                    <p className="title">Banana</p>
                    <button type="button" onClick={addToCartButton}>Add To Cart</button>
                </div>
                <div className="boxes">
                    <p className="title">Orange</p>
                    <button type="button" onClick={addToCartButton}>Add To Cart</button>
                </div>
                <div className="boxes">
                    <p className="title">Pineapple</p>
                    <button type="button" onClick={addToCartButton}>Add To Cart</button>
                </div>
                <div className="boxes">
                    <p className="title">Grapes</p>
                    <button type="button" onClick={addToCartButton}>Add To Cart</button>
                </div>
                <div className="boxes">
                    <p className="title">Strawberry</p>
                    <button type="button" onClick={addToCartButton}>Add To Cart</button>
                </div>
            </div>
        </>
    )


}

export default Dashboard;