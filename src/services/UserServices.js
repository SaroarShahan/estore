const { UserRepository } = require('../repository/User/UserRepository');

class UserServices {
  constructor() {
    if (UserServices.instance) return UserServices.instance;

    this.userRepository = new UserRepository();
    UserServices.instance = this;
  }

  async getAllUsers(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.userRepository.findAndCountAllUsers(req.query);

    return {
      totalCount: count,
      users: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
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
