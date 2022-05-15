const express = require('express');
const { body } = require('express-validator');

// Middlewares
const {
  protectToken,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');

const {
  createMealValidator,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders.controller');

const router = express.Router();

// Apply protectToken middleware
router.use(protectToken);

// /root
router.post('/', createOrder);

// /me
router.get('/me', getAllOrders);

//:id
router
  .route('/:id')
  .patch(protectAccountOwner, updateOrder)
  .delete(protectAccountOwner, deleteOrder);

module.exports = { mealsRouter: router };
