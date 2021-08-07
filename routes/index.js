const path = require('path');
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task');
const userController = require('../controllers/user');
const categoryController = require('../controllers/category');
const ROUTE = require('../constants/route');

const { verifyToken } = require('../middleware/auth');

// TASK
// Get all task
router.get(ROUTE.ALL_TASK, taskController.getAllTasks);

// Add new task
router.post(ROUTE.ADD_TASK, taskController.addTask);

// Find task by Id
router.get(ROUTE.TASK, taskController.getOneTask);

// Delete 1 or multiple tasks
router.delete(ROUTE.DELETE_TASK, taskController.deleteTasks);

// Edit task
router.put(ROUTE.MODIFY_TASK, taskController.editTask);

// CATEGORY
// Get all categories
router.get(ROUTE.ALL_CATEGORIES, categoryController.getAllCategories);

// Add new category
router.post(ROUTE.ADD_CATEGORY, categoryController.addCategory);

// Get 1 category
router.get(ROUTE.CATEGORY, categoryController.getOneCategory);

// Delete 1 or multiple categories
router.delete(ROUTE.DELETE_CATEGORY, categoryController.deleteCategories);

// Edit category
router.put(ROUTE.MODIFY_CATEGORY, categoryController.editCategory);

// USER - AUTHENTICATION
// Sign up
router.post(ROUTE.SIGN_UP, userController.signUp);

// Login
router.post(ROUTE.LOGIN, userController.login);

// Logout
router.get(ROUTE.LOGOUT, verifyToken, userController.logout);

// Get logged in user
router.get(ROUTE.GET_LOGGED_IN_USER, userController.getLoggedInUser);

module.exports = router;
