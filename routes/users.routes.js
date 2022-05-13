const express = require('express');
const { body } = require('express-validator');

// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../helpFolder/middlewares/users.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../helpFolder/middlewares/validations.middlewares');

// Controller
const {
  createUser,
  updateUser,
  deleteUser,
  login,
  getAllOrders
} = require('../helpFolder/controllers/users.controller');

const router = express.Router();

router.post('/signup', createUserValidations, checkValidations, createUser);

router.post('/login', login);

// Apply protectToken middleware
router.use(protectToken);

router
  .route('/:id')
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

//orders
router.get('/orders', protectAccountOwner, getAllOrders)
router.get('/orders/:id', protectAccountOwner, getOrderById)


module.exports = { usersRouter: router };
