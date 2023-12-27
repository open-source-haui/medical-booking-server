const express = require('express');
const { auth, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const { userController } = require('../../controllers');
const { uploadService } = require('../../services');

const userRouter = express.Router();

userRouter.route('/export').get(userController.exportUsersToExcel);
userRouter
  .route('/profile')
  .get(auth, validate(userValidation.getUser), userController.getUser)
  .put(
    auth,
    uploadService.uploadImage.fields([
      { name: 'avatar', maxCount: 1 },
      { name: 'cmndImg', maxCount: 1 },
      { name: 'insuranceImg', maxCount: 1 },
    ]),
    validate(userValidation.updateUser),
    userController.updateProfile,
  );
userRouter
  .route('/')
  .get(auth, validate(userValidation.getUsers), validate(userValidation.getUsers), userController.getUsers)
  .post(
    auth,
    authorize(['admin']),
    uploadService.uploadImage.fields([
      { name: 'avatar', maxCount: 1 },
      { name: 'cmndImg', maxCount: 1 },
      { name: 'insuranceImg', maxCount: 1 },
    ]),
    validate(userValidation.createUser),
    userController.createUser,
  );
userRouter
  .route('/:userId')
  .get(auth, validate(userValidation.getUser), userController.getUser)
  .put(
    auth,
    authorize(['admin']),
    uploadService.uploadImage.fields([
      { name: 'avatar', maxCount: 1 },
      { name: 'cmndImg', maxCount: 1 },
      { name: 'insuranceImg', maxCount: 1 },
    ]),
    validate(userValidation.updateUser),
    userController.updateUser,
  )
  .delete(auth, authorize(['admin']), validate(userValidation.deleteUser), userController.deleteUser)
  .lock(auth, authorize(['admin']), userController.lockUser);

module.exports = userRouter;
