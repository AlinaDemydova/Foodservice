const mongoose =require('mongoose');

const orderSchema = mongoose.Schema({
    listItems: { type: Array, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    orderBirth: { type: Date, default: Date.now },
    status: { type: String, required: true },
    commandButton: { type: String, required: true },
    pay: { type: String, required: true },
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);