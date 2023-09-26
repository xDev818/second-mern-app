const mongoose = require('mongoose');

const Cart = new mongoose.Schema(
    {
        cart_id : {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        item_name: {
            type: mongoose.SchemaTypes.String
        }
    }, { timestamps : true }
)

module.exports = mongoose.model('carts', Cart);