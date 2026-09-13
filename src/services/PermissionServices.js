const { Op } = require('sequelize');
const { PermissionModel, RolePermissionModel } = require('../models');
const { PermissionRepository } = require('../repository/PermissionRepository');
const { limitAndOffsetBuilder } = require('../utils');

class PermissionServices {
  constructor() {
    if (PermissionServices.instance) return PermissionServices.instance;

    this.permissionRepository = new PermissionRepository();
    PermissionServices.instance = this;
  }

  async getAllPermissions(req) {
    const options = {};
    const { page } = req.query;
    const { limit, offset } = limitAndOffsetBuilder(req.query);

    if (req.query.module) {
      options.where = { ...options.where, module: req.query.module };
    }

    if (req.query.search) {
      options.where = {
        ...options.where,
        [Op.or]: [
          { name: { [Op.iLike]: `%${req.query.search}%` } },
          { label: { [Op.iLike]: `%${req.query.search}%` } },
          { module: { [Op.iLike]: `%${req.query.search}%` } },
        ],
      };
    }

    if (req.query.sortBy && req.query.orderBy) {
      options.order = [[req.query.sortBy, req.query.orderBy.toUpperCase()]];
    }

    const { rows, count } = await this.permissionRepository.findAndCountAll({
      attributes: ['id', 'name', 'label', 'module'],
      where: options.where || {},
      limit,
      offset,
      order: options.order || [['module', 'ASC'], ['id', 'DESC']],
    });

    return {
      totalCount: count,
      permissions: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getPermission(id) {
    return this.permissionRepository.findById(id);
  }

  async createPermission(data) {
    return this.permissionRepository.create(data);
  }

  async updatePermission(id, data) {
    return this.permissionRepository.update(id, data);
  }

  async deletePermission(id) {
    const permission = await this.permissionRepository.findById(id);

    if (!permission) return { permission: null };

    const roleCount = await RolePermissionModel.count({ where: { permissionId: id } });

    if (roleCount > 0) {
      const error = new Error(
        `Cannot delete permission: It is currently assigned to ${roleCount} ${roleCount === 1 ? 'role' : 'roles'}.`,
      );
      error.httpStatusCode = 400;
      throw error;
    }

    await this.permissionRepository.delete(id);
    return { permission };
  }
}

module.exports = { PermissionServices };
