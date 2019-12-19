const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredientsList: { type: String, required: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalItem: { type: Number, required: false },
    imagePath: { type: String, required: true }
});

module.exports = mongoose.model('Meal', mealSchema);