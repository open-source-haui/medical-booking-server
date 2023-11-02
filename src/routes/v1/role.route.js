const express = require('express');
const { auth, authorize } = require('../../middlewares/auth');
const { roleController } = require('../../controllers');

const roleRouter = express.Router();

roleRouter.route('/').get(roleController.getRoles).post(roleController.createRole);

roleRouter
  .route('/:roleId')
  .get(roleController.getRole)
  .put(roleController.updateRole)
  .delete(roleController.deleteRole)
  .lock(roleController.lockRole);

module.exports = roleRouter;
