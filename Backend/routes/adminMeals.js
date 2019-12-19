const express = require('express');
const router = express.Router();
const MealController = require('../controllers/adminMeals');
const extractFile = require('../middleware/file');

//http://localhost:4200/admin/menulist {GET}
router.get('/', MealController.getMeals);

//http://localhost:4200/admin/menulist {POST}
router.post('/', extractFile, MealController.postMeals);

//http://localhost:4200/admin/menulist/:id {DELETE}
router.delete('/:id', MealController.deleteMeal);

//http://localhost:4200/admin/menulist/:id {GET}
router.get('/:id', MealController.getMeal);

//http://localhost:4200/admin/menulist/:id {PUT}
router.put('/:id', extractFile, MealController.putMeal);

module.exports = router;