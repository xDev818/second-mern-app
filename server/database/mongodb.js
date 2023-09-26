const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_STRING_CONNECTION)
.then( () => console.log('Mongodb is connected') )
.catch( err => console.log( err) )