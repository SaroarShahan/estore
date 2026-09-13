const express = require('express');

const { PermissionController } = require('../controllers/PermissionController');
const { authenticateToken, optionalAuthenticateToken } = require('../middlewares/auth');
const { hasPermission } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  createPermissionSchema,
  deletePermissionSchema,
  getPermissionSchema,
  getPermissionsSchema,
  updatePermissionSchema,
} = require('../validations/permissionValidation');

class PermissionRoutes {
  static configureRoutes() {
    const router = express.Router();
    const permissionController = new PermissionController();

    router
      .route('/')
      .get(
        [optionalAuthenticateToken, validate(getPermissionsSchema)],
        permissionController.getAllPermissions,
      )
      .post(
        [authenticateToken, hasPermission('permissions.create'), validate(createPermissionSchema)],
        permissionController.createPermission,
      );

    router
      .route('/:id')
      .get(
        [optionalAuthenticateToken, validate(getPermissionSchema)],
        permissionController.getPermission,
      )
      .patch(
        [authenticateToken, hasPermission('permissions.update'), validate(updatePermissionSchema)],
        permissionController.updatePermission,
      )
      .delete(
        [authenticateToken, hasPermission('permissions.delete'), validate(deletePermissionSchema)],
        permissionController.deletePermission,
      );

    return router;
  }
}

module.exports = { PermissionRoutes };
