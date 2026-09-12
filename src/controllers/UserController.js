const { UserServices } = require('../services/UserServices');

const userServices = new UserServices();

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userServices.getAllUsers(req);

      res.status(200).json({
        status: true,
        message: 'Fetched all users successfully',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
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
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const newUser = await userServices.createUser(req.body);

      res.status(201).json({
        status: true,
        message: 'User created successfully',
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
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
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const deletedUser = await userServices.deleteUser(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        status: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UserController };
