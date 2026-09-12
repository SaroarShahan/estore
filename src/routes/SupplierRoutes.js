const express = require('express');

const { SupplierController } = require('../controllers/SupplierController');

class SupplierRoutes {
  static configureRoutes() {
    const router = express.Router();
    const supplierController = new SupplierController();

    router.route('/').get(supplierController.getAllSuppliers).post(supplierController.createSupplier);

    router
      .route('/:id')
      .get(supplierController.getSupplier)
      .patch(supplierController.updateSupplier)
      .delete(supplierController.deleteSupplier);

    return router;
  }
}

module.exports = { SupplierRoutes };
