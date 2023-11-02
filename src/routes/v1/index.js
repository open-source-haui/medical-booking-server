const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const authRoute = require('./auth.route');
const departmentRoute = require('./department.route');

const routes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/departments',
    route: departmentRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
