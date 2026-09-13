const express = require('express');

const { SupplierController } = require('../controllers/SupplierController');
const { authenticateToken, optionalAuthenticateToken } = require('../middlewares/auth');
const { hasPermission } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  createSupplierSchema,
  deleteSupplierSchema,
  getSupplierSchema,
  getSuppliersSchema,
  updateSupplierSchema,
} = require('../validations/supplierValidation');

class SupplierRoutes {
  static configureRoutes() {
    const router = express.Router();
    const supplierController = new SupplierController();

    router
      .route('/')
      .get(
        [optionalAuthenticateToken, validate(getSuppliersSchema)],
        supplierController.getAllSuppliers,
      )
      .post(
        [authenticateToken, hasPermission('suppliers.create'), validate(createSupplierSchema)],
        supplierController.createSupplier,
      );

    router
      .route('/:id')
      .get([optionalAuthenticateToken, validate(getSupplierSchema)], supplierController.getSupplier)
      .patch(
        [authenticateToken, hasPermission('suppliers.update'), validate(updateSupplierSchema)],
        supplierController.updateSupplier,
      )
      .delete(
        [authenticateToken, hasPermission('suppliers.delete'), validate(deleteSupplierSchema)],
        supplierController.deleteSupplier,
      );

    return router;
  }
}

module.exports = { SupplierRoutes };
