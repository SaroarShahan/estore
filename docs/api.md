# API Reference

The API base path is `/api/v1`.

## Health Check

```http
GET /health
```

## Authentication

Register and log in through the public auth endpoints:

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

Send the returned token on protected requests:

```http
Authorization: Bearer <token>
```

Read endpoints accept optional authentication. Create, update, and delete endpoints require a
valid token and the matching permission. Admin users bypass permission checks.

## Resources

Each resource supports list, create, retrieve, update, and delete operations:

```text
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id

GET    /api/v1/categories
POST   /api/v1/categories
GET    /api/v1/categories/:id
PATCH  /api/v1/categories/:id
DELETE /api/v1/categories/:id

GET    /api/v1/products
POST   /api/v1/products
GET    /api/v1/products/:id
PATCH  /api/v1/products/:id
DELETE /api/v1/products/:id

GET    /api/v1/suppliers
POST   /api/v1/suppliers
GET    /api/v1/suppliers/:id
PATCH  /api/v1/suppliers/:id
DELETE /api/v1/suppliers/:id

GET    /api/v1/customers
POST   /api/v1/customers
GET    /api/v1/customers/:id
PATCH  /api/v1/customers/:id
DELETE /api/v1/customers/:id

GET    /api/v1/orders
POST   /api/v1/orders
GET    /api/v1/orders/:id
PATCH  /api/v1/orders/:id
DELETE /api/v1/orders/:id
```

## Roles and Permissions

```text
GET    /api/v1/roles
POST   /api/v1/roles
GET    /api/v1/roles/:id
PATCH  /api/v1/roles/:id
DELETE /api/v1/roles/:id

GET    /api/v1/permissions
POST   /api/v1/permissions
GET    /api/v1/permissions/:id
PATCH  /api/v1/permissions/:id
DELETE /api/v1/permissions/:id
```

Write operations use permissions such as `products.create`, `orders.update`, and
`customers.delete`. Role and permission management uses `roles.*` and `permissions.*` permissions.
Deleting a role assigned to users or a permission assigned to roles is rejected.

## Responses

Successful responses use `ResponseMessage` fields including `data`, `httpStatusCode`, `appCode`, `message`, and `requestId`.

Unknown routes return a not-found response. Errors are handled by the global exception middleware and use the same response format.
