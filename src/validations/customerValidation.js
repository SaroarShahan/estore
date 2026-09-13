const { z } = require('zod');
const { idParamSchema, pageLimitQuerySchema } = require('./common');

const customerFields = {
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  address: z.string().trim().nullable().optional(),
};

module.exports = {
  createCustomerSchema: { body: z.object(customerFields).strict() },
  updateCustomerSchema: {
    params: idParamSchema,
    body: z.object(customerFields).partial().strict(),
  },
  getCustomerSchema: { params: idParamSchema },
  deleteCustomerSchema: { params: idParamSchema },
  getCustomersSchema: {
    query: pageLimitQuerySchema.extend({ search: z.string().trim().optional() }),
  },
};
