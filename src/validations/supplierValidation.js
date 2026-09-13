const { z } = require('zod');
const { idParamSchema, pageLimitQuerySchema } = require('./common');

const supplierFields = {
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().max(30).nullable().optional(),
  address: z.string().trim().nullable().optional(),
  isActive: z.coerce.boolean().optional(),
};

module.exports = {
  createSupplierSchema: { body: z.object(supplierFields).strict() },
  updateSupplierSchema: {
    params: idParamSchema,
    body: z.object(supplierFields).partial().strict(),
  },
  getSupplierSchema: { params: idParamSchema },
  deleteSupplierSchema: { params: idParamSchema },
  getSuppliersSchema: {
    query: pageLimitQuerySchema.extend({ search: z.string().trim().optional() }),
  },
};
