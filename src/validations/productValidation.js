const { z } = require('zod');
const { idParamSchema, pageLimitQuerySchema } = require('./common');

const productFields = {
  name: z.string().trim().min(1).max(150),
  description: z.string().trim().nullable().optional(),
  price: z.coerce.number().nonnegative(),
  sku: z.string().trim().min(1).max(50),
  productImage: z.string().trim().nullable().optional(),
  quantity: z.coerce.number().int().nonnegative().optional(),
  categoryId: z.coerce.number().int().positive(),
  supplierId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),
  isActive: z.coerce.boolean().optional(),
};

module.exports = {
  createProductSchema: { body: z.object(productFields).strict() },
  updateProductSchema: { params: idParamSchema, body: z.object(productFields).partial().strict() },
  getProductSchema: { params: idParamSchema },
  deleteProductSchema: { params: idParamSchema },
  getProductsSchema: {
    query: pageLimitQuerySchema.extend({
      categoryId: z.coerce.number().int().positive().optional(),
      supplierId: z.coerce.number().int().positive().optional(),
      supplierName: z.string().trim().optional(),
      categoryName: z.string().trim().optional(),
      minPrice: z.coerce.number().nonnegative().optional(),
      maxPrice: z.coerce.number().nonnegative().optional(),
      isActive: z.coerce.boolean().optional(),
      search: z.string().trim().optional(),
    }),
  },
};
