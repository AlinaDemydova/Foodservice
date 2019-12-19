const Order = require('../db/models/order');

exports.getOrders = (req, res, next) => {
    Order.find().where("status").ne('CLOSED')
        .then(documents => {
            res.status(200).json({
            orders: documents
        });
    });
}
// Order.find({status: 'CLOSED'})  || {status: 'IN PROGRESS'} ||{status: 'DONE'}
exports.getUnprocessedOrders = (req, res, next) => {
    Order.find({status: 'UNPROCESSED'})
        .then(documents => {
            res.status(200).json({
            orders: documents
        });
    });
}
exports.getInProgressOrders = (req, res, next) => {
    Order.find({status: 'IN PROGRESS'})
        .then(documents => {
            res.status(200).json({
            orders: documents
        });
    });
}
exports.getDoneOrders = (req, res, next) => {
    Order.find({status: 'DONE'})
        .then(documents => {
            res.status(200).json({
            orders: documents
        });
    });
}
exports.getOrder = (req, res, next) => {
    Order.findById(req.params.id).then(order => {
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    })
  }
  
  exports.putOrder = (req, res, next) => {
      const order = new Order({
        _id: req.body.id,
        listItems: req.body.listItems,
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        orderBirth: req.body.orderBirth,
        status: req.body.status,
        commandButton: req.body.commandButton,
        pay: req.body.pay,
        totalQuantity: req.body.totalQuantity,
        totalPrice: req.body.totalPrice
      });
      Order.updateOne({_id: req.params.id}, order).then(result => {
          res.status(200).json({ message: "Updated successfully" });
      });
  }

  exports.deleteOrder = (req, res, next) => {
    Order.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({
            message: 'Deleted'
        });
    });
}