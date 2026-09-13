# Estore API

A Node.js REST API built with Express, Sequelize, and PostgreSQL. The app is organized into routes,
controllers, services, repositories, and Sequelize models.

## Features

- Express 5 API server
- JSON request parsing
- Health check endpoint
- User, category, product, supplier, customer, and order CRUD endpoints
- Product and customer search/filtering
- Order and customer relationships with nested related data
- Sequelize model loading
- PostgreSQL support through `pg` and `pg-hstore`
- Environment-based configuration with `dotenv`
- Sequelize CLI scripts for migrations, seeders, and model generation

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL

## Getting Started

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Update `.env` with your local database values:

```env
DB_NAME=node_boilerplate
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_DIALECT=postgres
DB_PORT=5432
PORT=8080
```

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

The server uses `PORT` from `.env`, or falls back to `4000`.

## API

Base API path:

```text
/api/v1
```

Health check:

```http
GET /health
```

Resource routes:

```http
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

### List queries

List endpoints support `page`, `limit`, `sortBy`, and `orderBy`. The default page size is 20 and
the maximum page size is 100.

Product filters:

```http
GET /api/v1/products?search=mouse
GET /api/v1/products?categoryId=1&supplierId=1
GET /api/v1/products?minPrice=10&maxPrice=50
GET /api/v1/products?supplierName=tech&categoryName=electronics
GET /api/v1/products?isActive=true&page=2&limit=20&sortBy=price&orderBy=asc
```

`search` performs a partial, case-insensitive search on product name and SKU.

Customer filters:

```http
GET /api/v1/customers?search=john
GET /api/v1/customers?page=1&limit=20&sortBy=created_at&orderBy=desc
```

Customer search checks name, email, and phone. Customer list responses include related orders and
their product details for products in the Electronics category.

Order filters:

```http
GET /api/v1/orders?customerId=1
GET /api/v1/orders?status=confirmed
GET /api/v1/orders?minTotalAmount=50&maxTotalAmount=200
GET /api/v1/orders?customerId=1&page=2&limit=20&sortBy=created_at&orderBy=desc
```

Example user payload:

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

`status` can be `active`, `inactive`, or `blocked`.

Example category payload:

```json
{
  "name": "Electronics",
  "description": "Devices, gadgets, and electronic accessories."
}
```

Example supplier payload:

```json
{
  "name": "TechSource Ltd.",
  "email": "sales@techsource.example.com",
  "phone": "+8801700000001",
  "address": "Gulshan, Dhaka, Bangladesh",
  "isActive": true
}
```

Example customer payload:

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1-555-0102",
  "address": "456 Oak Avenue, Los Angeles, CA"
}
```

Example order payload:

```json
{
  "customerId": 1,
  "status": "pending",
  "totalAmount": 64.97
}
```

Order status can be `pending`, `confirmed`, `shipped`, `delivered`, or `cancelled`.

Example product payload:

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

## Database

Runtime database connection settings are loaded from:

- `src/config/db.js`
- `src/config/config.js`

Models use underscored database columns, so JavaScript fields like `firstName`, `productImage`, and
`isActive` map to columns like `first_name`, `product_image`, and `is_active`. Users, products, and
suppliers, customers, orders, and order items use Sequelize `paranoid`, so deleted rows use a
`deleted_at` timestamp instead of being removed immediately.

Successful responses use a `ResponseMessage` object with `data`, `httpStatusCode`, `appCode`,
`message`, and `requestId` fields. Errors are handled by the global exception middleware and use
the same response format.

## Sequelize Commands

Run migrations:

```bash
npm run migrate
```

Undo the latest migration:

```bash
npm run migrate:undo
```

Undo all migrations:

```bash
npm run migrate:undo:all
```

Run all seeders:

```bash
npm run seed
```

Undo the latest seeder:

```bash
npm run seed:undo
```

Undo all seeders:

```bash
npm run seed:undo:all
```

Generate a migration:

```bash
npm run migration:gen -- create-users
```

Generate a model:

```bash
npm run model:gen -- User --attributes name:string,email:string
```

For a fresh local database, run migrations before seeders:

```bash
npm run migrate
npm run seed
```

The seeders create the base users, categories, suppliers, and products, plus 50 customers, 500
orders, and 1,000 order items. Seeders use fixed IDs and are intended for an empty development
database. To reseed an existing development database, undo the seeders first:

```bash
npm run seed:undo:all
npm run seed
```

## Project Structure

```text
.
├── src/
│   ├── Index.js
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── config.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── CategoryController.js
│   │   ├── CustomerController.js
│   │   ├── OrderController.js
│   │   ├── ProductController.js
│   │   ├── SupplierController.js
│   │   └── UserController.js
│   ├── models/
│   │   ├── CategoryModel.js
│   │   ├── CustomerModel.js
│   │   ├── OrderItemModel.js
│   │   ├── OrderModel.js
│   │   ├── ProductMode.js
│   │   ├── Supplier.js
│   │   ├── UserModel.js
│   │   └── index.js
│   ├── repository/
│   │   ├── CategoryRepository.js
│   │   ├── CustomerRepository.js
│   │   ├── OrderRepository.js
│   │   ├── ProductRepository.js
│   │   ├── SupplierRepository.js
│   │   └── UserRepository.js
│   ├── routes/
│   │   ├── CategoryRoutes.js
│   │   ├── CustomerRoutes.js
│   │   ├── OrderRoutes.js
│   │   ├── ProductRoutes.js
│   │   ├── SupplierRoutes.js
│   │   ├── UserRoutes.js
│   │   └── index.js
│   └── services/
│       ├── CategoryServices.js
│       ├── CustomerServices.js
│       ├── OrderServices.js
│       ├── ProductServices.js
│       ├── SupplierServices.js
│       └── UserServices.js
├── migrations/
├── seeders/
├── .env.example
├── .sequelizerc
├── package.json
└── README.md
```

## License

MIT
