const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const authRoute = require('./auth.route');
const doctorRoute = require('./doctor.route');
const departmentRoute = require('./department.route');
const workingPlanRoute = require('./workingPlan.route');

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
    path: '/doctors',
    route: doctorRoute,
  },
  {
    path: '/departments',
    route: departmentRoute,
  },
  {
    path: '/working-plans',
    route: workingPlanRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
