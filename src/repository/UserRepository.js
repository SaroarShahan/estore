const { UserModel } = require('../models');

class UserRepository {
  constructor() {
    if (UserRepository.instance) return UserRepository.instance;

    UserRepository.instance = this;
  }

  async create(data) {
    return UserModel.create(data);
  }

  async findAndCountAll(options) {
    return UserModel.findAndCountAll(options);
  }

  async findById(id) {
    return UserModel.findByPk(id);
  }

  async update(id, data) {
    const user = await UserModel.findByPk(id);

    if (!user) return null;

    return user.update(data);
  }

  async delete(id) {
    const user = await UserModel.findByPk(id);

    if (!user) return null;

    return user.destroy();
  }
}

module.exports = { UserRepository };
