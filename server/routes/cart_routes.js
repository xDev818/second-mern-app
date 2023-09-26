const { Router } = require('express');
const { addToCart, getUserCartItem } = require('../controllers/carts_controller');

const router = Router();

router.post('/add-cart', addToCart);
router.post('/get-user-cart', getUserCartItem);

module.exports = router;
