const { PermissionModel } = require('../../models');
const { buildPermissionQuery } = require('./permissionQueryBuilder');

class PermissionRepository {
  constructor() {
    if (PermissionRepository.instance) return PermissionRepository.instance;

    PermissionRepository.instance = this;
  }

  async create(data) {
    return PermissionModel.create(data);
  }

  async findAndCountAll(options) {
    return PermissionModel.findAndCountAll(options);
  }

  async findAndCountAllPermissions(query) {
    const options = buildPermissionQuery(query);
    return {
      ...(await PermissionModel.findAndCountAll({
        ...options,
        attributes: ['id', 'name', 'label', 'module'],
      })),
      limit: options.limit,
    };
  }

  async findById(id) {
    return PermissionModel.findByPk(id);
  }

  async findOne(options) {
    return PermissionModel.findOne(options);
  }

  async update(id, data) {
    const permission = await PermissionModel.findByPk(id);

    if (!permission) return null;

    return permission.update(data);
  }

  async delete(id) {
    const permission = await PermissionModel.findByPk(id);

    if (!permission) return null;

    return permission.destroy();
  }
}

module.exports = { PermissionRepository };
