const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderCart');

//http://localhost:4200/client/cart {POST}
router.post('/', OrderController.makeOrder);

module.exports = router;