const express = require('express');
const { body } = require('express-validator');

// Middlewares
const {
  protectToken,
  protectAdmin,
} = require('../middlewares/users.middlewares');

const {
  createMealValidator,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals.controller');

const router = express.Router();

// /root
router.get('/', getAllMeals);
router.get('/:id', getMealById);

// Apply protectToken middleware
router.use(protectToken);

//:id
router
  .route('/:id')
  .patch(protectAdmin, updateMeal)
  .delete(protectAdmin, deleteMeal);

module.exports = { mealsRouter: router };
