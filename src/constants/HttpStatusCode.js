//***** Http Status Code Constant   ***** /
const httpStatus = Object.freeze({
  ok: 200,
  notFound: 404,
  unAuthorised: 401,
  internalServerError: 500,
  badRequest: 400,
});

module.exports = { httpStatus };
