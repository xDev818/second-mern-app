const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        username: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true
        },
        password: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
    }, { timestamps: true }
)

module.exports = mongoose.model('users', User);