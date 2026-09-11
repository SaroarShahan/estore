const express = require('express');

const { UserController } = require('../controllers/UserController');

class UserRoutes {
  static configureRoutes() {
    const router = express.Router();
    const userController = new UserController();

    router.route('/').get(userController.getAllUsers).post(userController.createUser);

    router
      .route('/:id')
      .get(userController.getUser)
      .patch(userController.updateUser)
      .delete(userController.deleteUser);

    return router;
  }
}

module.exports = { UserRoutes };
