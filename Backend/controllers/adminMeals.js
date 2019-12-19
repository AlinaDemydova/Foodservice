const Meal = require('../db/models/meal');

exports.getMeals = (req, res, next) => {
    Meal.find()
        .then(documents => {
            res.status(200).json({meals: documents});
    });
}

exports.postMeals = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const meal = new Meal({
        name: req.body.name,
        description: req.body.description,
        ingredientsList: req.body.ingredientsList,
        weight: JSON.parse(req.body.weight),
        price: JSON.parse(req.body.price),
        quantity: JSON.parse(req.body.quantity),
        imagePath: url + '/images/' + req.file.filename
    });
    meal.save().then(createdMeal => {
        res.status(201).json({
            meal: {
                ...createdMeal,
                id: createdMeal._id
            } 
        });
    }); 
}

exports.deleteMeal = (req, res, next) => {
    Meal.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({
            message: 'Deleted'
        });
    });
}

exports.getMeal = (req, res, next) => {
    Meal.findById(req.params.id).then(meal => {
        if (meal) {
            res.status(200).json(meal);
        } else {
            res.status(404).json({ message: 'Meal not found' });
        }
    })
  }
  
  exports.putMeal = (req, res, next) => {
      let imagePath = req.body.imagePath;
     if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename
     }
    const meal = new Meal({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        ingredientsList: req.body.ingredientsList,
        weight: req.body.weight,
        price: req.body.price,
        quantity: req.body.quantity,
        imagePath: imagePath
      });
      Meal.updateOne({_id: req.params.id}, meal).then(result => {
          res.status(200).json({ message: "Updated successfully" });
      });
  }