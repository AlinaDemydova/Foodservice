const Order = require('../db/models/order');

exports.makeOrder = (req, res, next) => {
    const order = new Order({
        listItems: req.body.listItems,
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        status: req.body.status,
        commandButton: req.body.commandButton,
        pay: req.body.pay,
        totalQuantity: req.body.totalQuantity,
        totalPrice: req.body.totalPrice
    });
    order.save().then(createdOrder => {
        res.status(201).json({
            orderId: createdOrder._id
        });
    }); 
}