# Getting Started

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL

## Install

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Update `.env` with the local database settings:

```env
DB_NAME=node_boilerplate
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_DIALECT=postgres
DB_PORT=5432
PORT=8080
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
```

`JWT_SECRET` is required for token generation and verification. Keep it private and use a strong
random value outside local development.

## Run

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

The server reads `PORT` from `.env` and falls back to port `4000`.

## Fresh Database

Run migrations before seeders:

```bash
npm run migrate
npm run seed
```

The seeders create the base users, categories, suppliers, and products, plus 50 customers, 500 orders, and 1,000 order items.
