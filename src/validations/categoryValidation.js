const { z } = require('zod');
const { idParamSchema, pageLimitQuerySchema } = require('./common');

const categoryFields = {
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().nullable().optional(),
};

module.exports = {
  createCategorySchema: { body: z.object(categoryFields).strict() },
  updateCategorySchema: {
    params: idParamSchema,
    body: z.object(categoryFields).partial().strict(),
  },
  getCategorySchema: { params: idParamSchema },
  deleteCategorySchema: { params: idParamSchema },
  getCategoriesSchema: { query: pageLimitQuerySchema },
};
