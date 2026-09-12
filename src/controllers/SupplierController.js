const { SupplierServices } = require('../services/SupplierServices');

const supplierServices = new SupplierServices();

class SupplierController {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async getAllSuppliers(req, res, next) {
    try {
      const suppliers = await supplierServices.getAllSuppliers();

      res.status(200).json({
        status: true,
        message: 'Fetched all suppliers successfully',
        suppliers: suppliers,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSupplier(req, res, next) {
    try {
      const supplier = await supplierServices.getSupplier(req.params.id);

      if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Fetched supplier successfully',
        supplier: supplier,
      });
    } catch (error) {
      next(error);
    }
  }

  async createSupplier(req, res, next) {
    try {
      const newSupplier = await supplierServices.createSupplier(req.body);

      res.status(201).json({
        status: true,
        message: 'Supplier created successfully',
        supplier: newSupplier,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSupplier(req, res, next) {
    try {
      const updatedSupplier = await supplierServices.updateSupplier(req.params.id, req.body);

      if (!updatedSupplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Supplier updated successfully',
        supplier: updatedSupplier,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSupplier(req, res, next) {
    try {
      const deletedSupplier = await supplierServices.deleteSupplier(req.params.id);

      if (!deletedSupplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Supplier deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { SupplierController };
