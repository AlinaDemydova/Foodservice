const Meal = require('../db/models/meal');

exports.getMenu = (req, res, next) => {
    Meal.find()
        .then(documents => {
            res.status(200).json({
            meals: documents
        });
    });
}