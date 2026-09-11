# Estore API

A Node.js REST API built with Express, Sequelize, and PostgreSQL. The app is organized into routes,
controllers, services, repositories, and Sequelize models.

## Features

- Express 5 API server
- JSON request parsing
- Health check endpoint
- User CRUD endpoints
- Sequelize model loading
- PostgreSQL support through `pg` and `pg-hstore`
- Environment-based configuration with `dotenv`
- Sequelize CLI scripts for migrations and model generation

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

User routes:

```http
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
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

## Database

Runtime database connection settings are loaded from:

- `src/config/db.js`
- `src/config/config.js`

The `UserModel` maps to the `users` table and uses underscored timestamp columns. Soft deletes are
enabled with Sequelize `paranoid`, so deleted rows use a `deleted_at` timestamp instead of being
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
│   │   └── UserController.js
│   ├── models/
│   │   ├── UserModel.js
│   │   └── index.js
│   ├── repository/
│   │   └── UserRepository.js
│   ├── routes/
│   │   ├── UserRoutes.js
│   │   └── index.js
│   └── services/
│       └── UserServices.js
├── .env.example
├── .sequelizerc
├── package.json
└── README.md
```

## License

MIT
