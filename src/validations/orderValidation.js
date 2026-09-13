const { z } = require('zod');
const { idParamSchema, pageLimitQuerySchema } = require('./common');

const orderStatusSchema = z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']);
const orderFields = {
  customerId: z.coerce.number().int().positive(),
  status: orderStatusSchema.optional(),
  totalAmount: z.coerce.number().nonnegative().optional(),
};

module.exports = {
  createOrderSchema: { body: z.object(orderFields).strict() },
  updateOrderSchema: { params: idParamSchema, body: z.object(orderFields).partial().strict() },
  getOrderSchema: { params: idParamSchema },
  deleteOrderSchema: { params: idParamSchema },
  getOrdersSchema: {
    query: pageLimitQuerySchema.extend({
      customerId: z.coerce.number().int().positive().optional(),
      status: orderStatusSchema.optional(),
      minTotalAmount: z.coerce.number().nonnegative().optional(),
      maxTotalAmount: z.coerce.number().nonnegative().optional(),
    }),
  },
};
