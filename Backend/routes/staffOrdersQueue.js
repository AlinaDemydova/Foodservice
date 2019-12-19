const express = require('express');
const router = express.Router();
const staffOrderQueueController = require('../controllers/staffOrdersQueue');

// http://localhost:4200/staff/ordersqueue {GET}
router.get('/', staffOrderQueueController.getOrders);

//http://localhost:4200/staff/ordersqueue/:id {GET}
router.get('/:id', staffOrderQueueController.getOrder);

//http://localhost:4200/staff/ordersqueue/:id {DELETE}
router.delete('/:id', staffOrderQueueController.deleteOrder);

//http://localhost:4200/staff/ordersqueue/:id {PUT}
router.put('/:id', staffOrderQueueController.putOrder);

// http://localhost:4200/staff/ordersqueue {GET}
router.get('/', staffOrderQueueController.getUnprocessedOrders);
// http://localhost:4200/staff/ordersqueue {GET}
router.get('/', staffOrderQueueController.getInProgressOrders);
// http://localhost:4200/staff/ordersqueue {GET}
router.get('/', staffOrderQueueController.getDoneOrders);

module.exports = router;