const jwt = require('jsonwebtoken');
const User = require('../models/users_model');

const createUser = async ( request, response ) => {

    const { username, password } = request.body;

    if( !username && !password ) return response.status(400).send(
        {
            message: "Fields are required"
        }
    )

    if( !username ) return response.status(400).send(
        {
            message: "Username is required"
        }
    )

    if( !password ) return response.status(400).send(
        {
            message: "Password is required"
        }
    )

    const userDb = await User.findOne( { username } )

    if(userDb) return response.status(409).send(
        {
            message: "Username is already used"
        }
    )

    const newUser = await User.create( { username, password } )

    newUser.save();

    response.status(201).send(
        {
            message: "Registered Successfully"
        }
    )
}

const loginUser = async ( request, response ) => {

    const { username, password } = request.body

    if( !username && !password ) return response.status(400).send(
        {
            message: "Fields are required"
        }
    )

    if( !username ) return response.status(400).send(
        {
            message: "Username is required"
        }
    )

    if( !password ) return response.status(400).send(
        {
            message: "Password is required"
        }
    )

    const userDb = await User.findOne( { username } );

    if(!userDb) return response.status(400).send(
        {
            message: "Wrong Credentials"
        }
    )
    
    if(userDb.password !== password) return response.status(400).send(
        {
            message: "Wrong Credentials"
        }
    )

    const id = userDb._id

    const newToken = jwt.sign( { id }, process.env.SECRET_KEY, { expiresIn: "2d" } )

    response.status(200).send(
        {
            message: "Logged In Successfully",
            token: newToken
        }
    )

}

const dashboardUser = async ( request, response ) => {

    const bearer = request.headers.authorization.split('=')[1];

    if(bearer == "null") return response.status(400).send(
        {
            message: "You're not authorized"
        }
    )

    const { id } = jwt.verify( bearer, process.env.SECRET_KEY)

    const { _id, username} = await User.findById( id )

    const newToken = jwt.sign( { _id, username }, process.env.SECRET_KEY, { expiresIn: '2d' } )

    response.status(200).send(
        {
            newToken
        }
    )

}

module.exports = {
    createUser,
    loginUser,
    dashboardUser
}
