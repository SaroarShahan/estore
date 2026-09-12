# Estore API

A Node.js REST API built with Express, Sequelize, and PostgreSQL. The app is organized into routes,
controllers, services, repositories, and Sequelize models.

## Features

- Express 5 API server
- JSON request parsing
- Health check endpoint
- User, category, product, and supplier CRUD endpoints
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
suppliers use Sequelize `paranoid`, so deleted rows use a `deleted_at` timestamp instead of being
removed immediately.

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
│   │   ├── ProductController.js
│   │   ├── SupplierController.js
│   │   └── UserController.js
│   ├── models/
│   │   ├── CategoryModel.js
│   │   ├── ProductMode.js
│   │   ├── Supplier.js
│   │   ├── UserModel.js
│   │   └── index.js
│   ├── repository/
│   │   ├── CategoryRepository.js
│   │   ├── ProductRepository.js
│   │   ├── SupplierRepository.js
│   │   └── UserRepository.js
│   ├── routes/
│   │   ├── CategoryRoutes.js
│   │   ├── ProductRoutes.js
│   │   ├── SupplierRoutes.js
│   │   ├── UserRoutes.js
│   │   └── index.js
│   └── services/
│       ├── CategoryServices.js
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
