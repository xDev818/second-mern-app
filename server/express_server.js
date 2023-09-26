require('dotenv').config();
const express = require('express');
const express_session = require('express-session');
const formData = require('express-form-data');
const cors = require('cors');

// Routers
const userRoutes = require('./routes/user_routes');
const cartRoutes = require('./routes/cart_routes');

require('./database/mongodb');

const app = express();
app.listen(process.env.PORT, () => console.log("Server is running at port of " + process.env.PORT))

// middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(formData.parse());
app.use(cors(
    {
        origin: 'https://second-mern-app.netlify.app',
        // origin: 'http://localhost:5173',
        credentials: true
    }
))
app.use(express_session(
    {
        secret: "1231234",
        resave: false,
        saveUninitialized: false,
<<<<<<< HEAD
=======
        cookie: {
            sameSite: 'None',
            secure: true
        }
>>>>>>> 8ddf0d35d69ed3885577d0341606a3c1d29d786a
    }
))

// Route's Api
app.use('/api', userRoutes);
// app.use( (request, response, next) => {
    
//     if(!request.session.users) return response.status(401).send(
//         {
//             message: "You are not authorized"
//         }
//     );

//     next();

<<<<<<< HEAD
// } ) 
app.use('/api', cartRoutes);
=======
} ) 
app.use('/api', cartRoutes);
>>>>>>> 8ddf0d35d69ed3885577d0341606a3c1d29d786a
