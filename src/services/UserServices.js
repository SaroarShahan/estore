const { UserRepository } = require('../repository/UserRepository');
const { limitAndOffsetBuilder } = require('./../utils');

class UserServices {
  constructor() {
    if (UserServices.instance) return UserServices.instance;

    this.userRepository = new UserRepository();
    UserServices.instance = this;
  }

  async getAllUsers(req) {
    const options = {};
    const { page } = req.query;
    const { limit, offset } = limitAndOffsetBuilder(req.query);

    if (req.query.status) {
      options.where = { ...options.where, status: req.query.status };
    }

    if (req.query.sortBy && req.query.orderBy) {
      const field = req.query.sortBy;
      const order = req.query.orderBy;
      options.order = [[field, order.toUpperCase()]];
    }

    const { rows, count } = await this.userRepository.findAndCountAll({
      where: options.where || {},
      limit,
      offset,
      order: options.order || [['created_at', 'desc']],
    });

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
