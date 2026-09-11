const { UserRepository } = require('../repository/UserRepository');

class UserServices {
  constructor() {
    if (UserServices.instance) return UserServices.instance;

    this.userRepository = new UserRepository();
    UserServices.instance = this;
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUser(id) {
    return await this.userRepository.findById(id);
  }

  async createUser(data) {
    return await this.userRepository.create(data);
  }

  async updateUser(id, data) {
    return await this.userRepository.update(id, data);
  }

  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }
}

module.exports = { UserServices };
