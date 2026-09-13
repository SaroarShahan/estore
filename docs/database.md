# Database and Sequelize

Runtime database settings are loaded from:

- `src/config/db.js`
- `src/config/config.js`

Models use underscored database columns. For example, JavaScript fields such as `firstName`, `productImage`, and `isActive` map to `first_name`, `product_image`, and `is_active`.

Users, products, suppliers, customers, orders, and order items use Sequelize `paranoid`; deletes set `deleted_at` instead of immediately removing rows.

## Commands

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

Seeders use fixed IDs and are intended for an empty development database. To reseed an existing development database:

```bash
npm run seed:undo:all
npm run seed
```

Generate a migration:

```bash
npm run migration:gen -- create-users
```

Generate a model:

```bash
npm run model:gen -- User --attributes name:string,email:string
```
