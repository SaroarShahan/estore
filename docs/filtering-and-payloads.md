# Filtering and Payloads

## Pagination and Sorting

List endpoints support `page`, `limit`, `sortBy`, and `orderBy`. The default page size is 20 and the maximum is 100.

Example:

```http
GET /api/v1/products?page=2&limit=20&sortBy=price&orderBy=asc
```

## Product Filters

```http
GET /api/v1/products?search=mouse
GET /api/v1/products?categoryId=1&supplierId=1
GET /api/v1/products?minPrice=10&maxPrice=50
GET /api/v1/products?supplierName=tech&categoryName=electronics
GET /api/v1/products?isActive=true
```

`search` performs a partial, case-insensitive search on product name and SKU.

## Customer Filters

```http
GET /api/v1/customers?search=john
GET /api/v1/customers?page=1&limit=20&sortBy=created_at&orderBy=desc
```

Customer search checks name, email, and phone. Customer list responses include related orders and product details for products in the Electronics category.

## Order Filters

```http
GET /api/v1/orders?customerId=1
GET /api/v1/orders?status=confirmed
GET /api/v1/orders?minTotalAmount=50&maxTotalAmount=200
GET /api/v1/orders?customerId=1&page=2&limit=20&sortBy=created_at&orderBy=desc
```

## Payloads

### Authentication

Register:

```json
{
  "username": "saroar",
  "email": "saroar@example.com",
  "password": "secret123",
  "gender": "male",
  "roleId": 3
}
```

Login:

```json
{
  "email": "saroar@example.com",
  "password": "secret123"
}
```

Passwords must be at least eight characters. Registration requires an existing role.

Customer:

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1-555-0102",
  "address": "456 Oak Avenue, Los Angeles, CA"
}
```

Order:

```json
{
  "customerId": 1,
  "status": "pending",
  "totalAmount": 64.97
}
```

Order status can be `pending`, `confirmed`, `shipped`, `delivered`, or `cancelled`.

Product:

```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with adjustable DPI.",
  "price": 24.99,
  "sku": "ELEC-MOUSE-001",
  "productImage": "wireless-mouse.jpg",
  "quantity": 120,
  "categoryId": 1,
  "supplierId": 1,
  "userId": 1,
  "isActive": true
}
```

User:

```json
{
  "firstName": "Saroar",
  "lastName": "Shahan",
  "userName": "saroar",
  "email": "saroar@example.com",
  "password": "secret",
  "status": "active"
}
```

User status can be `active`, `inactive`, or `blocked`.

## Validation

Request bodies, route IDs, and list query parameters are validated with Zod. Unknown fields are
rejected from request bodies. IDs must be positive integers, prices and quantities cannot be
negative, email fields must be valid email addresses, and enum fields only accept their documented
values.
