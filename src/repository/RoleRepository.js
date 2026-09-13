const { RoleModel } = require('../models');

class RoleRepository {
  constructor() {
    if (RoleRepository.instance) return RoleRepository.instance;

    RoleRepository.instance = this;
  }

  async create(data, options = {}) {
    return RoleModel.create(data, options);
  }

  async findAndCountAll(options) {
    return RoleModel.findAndCountAll(options);
  }

  async findById(id, options = {}) {
    return RoleModel.findByPk(id, options);
  }

  async findOne(options) {
    return RoleModel.findOne(options);
  }

  async update(id, data, options = {}) {
    const role = await RoleModel.findByPk(id, options);

    if (!role) return null;

    await role.update(data, options);
    return role;
  }

  async delete(id) {
    const role = await RoleModel.findByPk(id);

    if (!role) return null;

    return role.destroy();
  }
}

module.exports = { RoleRepository };
