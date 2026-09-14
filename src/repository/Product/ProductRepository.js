const { CategoryModel, ProductModel, SupplierModel } = require('../../models');
const { buildProductQuery } = require('./productQueryBuilder');

class ProductRepository {
  constructor() {
    if (ProductRepository.instance) return ProductRepository.instance;

    ProductRepository.instance = this;
  }

  async create(data) {
    return ProductModel.create(data);
  }

  async findAndCountAllProducts(query) {
    const { where, limit, offset, order } = buildProductQuery(query);

    const result = await ProductModel.findAndCountAll({
      include: [
        { model: SupplierModel, as: 'supplier', attributes: ['id', 'name'] },
        { model: CategoryModel, as: 'category', attributes: ['id', 'name'] },
      ],
      where,
      limit,
      offset,
      order,
    });

    return { ...result, limit };
  }

  async findById(id) {
    return ProductModel.findByPk(id);
  }

  async update(id, data) {
    const product = await ProductModel.findByPk(id);

    if (!product) return null;

    return product.update(data);
  }

  async delete(id) {
    const product = await ProductModel.findByPk(id);

    if (!product) return null;

    return product.destroy();
  }
}

module.exports = { ProductRepository };
