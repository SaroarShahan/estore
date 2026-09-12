const { UserServices } = require('../services/UserServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');

const userServices = new UserServices();

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllUsers,
      });

      const users = await userServices.getAllUsers(req);

      res.status(200).json({
        status: true,
        message: 'Fetched all users successfully',
        data: users,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getAllUsers,
      });
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getUser,
      });

      const user = await userServices.getUser(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Fetched user successfully',
        user: user,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getUser,
      });
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.createUser,
      });
      logger.info({
        message: 'Create User Req Body',
        context: loggerContexts.createUser,
        data: req.body,
      });

      const newUser = await userServices.createUser(req.body);

      res.status(201).json({
        status: true,
        message: 'User created successfully',
        user: newUser,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.createUser,
      });
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.updateUser,
      });
      logger.info({
        message: 'Update User Req Body',
        context: loggerContexts.updateUser,
        data: req.body,
      });

      const updatedUser = await userServices.updateUser(req.params.id, req.body);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        status: true,
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.updateUser,
      });
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.deleteUser,
      });

      const deletedUser = await userServices.deleteUser(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        status: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.deleteUser,
      });
      next(error);
    }
  }
}

module.exports = { UserController };
