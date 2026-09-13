# Estore API

A Node.js REST API built with Express, Sequelize, and PostgreSQL. The application uses a layered
architecture with routes, controllers, services, repositories, and Sequelize models.

## Features

- Express 5 API server with a health check
- CRUD endpoints for users, categories, products, suppliers, customers, and orders
- Product, customer, and order filtering with pagination and sorting
- PostgreSQL persistence through Sequelize
- Migrations, seeders, and model-generation scripts
- Shared response and exception-handling middleware

## Documentation

- [Getting Started](docs/getting-started.md)
- [API Reference](docs/api.md)
- [Filtering and Payloads](docs/filtering-and-payloads.md)
- [Database and Sequelize](docs/database.md)
- [Project Structure](docs/project-structure.md)
- [Documentation index](docs/README.md)

## Quick Start

```bash
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

The API is available under `/api/v1`. The health check is available at `/health`.

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL

## License

MIT
