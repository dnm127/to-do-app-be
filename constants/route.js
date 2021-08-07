// TASK
const ALL_TASK = '/api/all-tasks';
const TASK = '/api/task/:id';
const ADD_TASK = '/api/add-task';
const DELETE_TASK = '/api/delete-task';
const MODIFY_TASK = '/api/modify-task/:id';

// CATEGORY
const ALL_CATEGORIES = '/api/all-categories';
const CATEGORY = '/api/category/:id';
const ADD_CATEGORY = '/api/add-category';
const DELETE_CATEGORY = '/api/delete-category';
const MODIFY_CATEGORY = '/api/modify-category/:id';

// AUTHENTICATION
const SIGN_UP = 'api/sign-up';
const LOGIN = 'api/login';
const LOGOUT = 'api/logout';
const GET_LOGGED_IN_USER = 'api/get-logged-in-user';

module.exports = {
  /* TASK */
  ALL_TASK,
  TASK,
  ADD_TASK,
  DELETE_TASK,
  MODIFY_TASK,
  /* CATEGORY */
  ALL_CATEGORIES,
  ADD_CATEGORY,
  CATEGORY,
  DELETE_CATEGORY,
  MODIFY_CATEGORY,
  /* AUTHENTICATION */
  SIGN_UP,
  LOGIN,
  LOGOUT,
  GET_LOGGED_IN_USER,
};
