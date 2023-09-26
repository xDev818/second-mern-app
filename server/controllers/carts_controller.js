const Carts = require('../models/cart_model');
const User = require('../models/users_model');

const addToCart = async ( request, response ) => {

    const { id, name } = request.body

    if(!id && !name) return response.status(400).send(
        {
            mesage: "Fields are required"
        }
    )

    if(!id) return response.status(400).send(
        {
            mesage: "Id is required"
        }
    )

    if(!name) return response.status(400).send(
        {
            mesage: "Name is required"
        }
    )

    const newCart = await Carts.create( { cart_id: id, item_name: name } );

    newCart.save();

    response.status(201).send(
        {
            message: "Added to cart successfully"
        }
    )

}

const getUserCartItem = async ( request, response ) => {

    const { id } = request.body

    const cartItems = await Carts.find( { cart_id: id } )

    response.status(200).send(
        {
            my_items: cartItems
        }
    )

}

module.exports = {
    addToCart,
    getUserCartItem
}