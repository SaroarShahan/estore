# Project Structure

```text
.
├── src/
│   ├── Index.js
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── authorize.js
│   │   ├── ExceptionHandling.js
│   │   ├── ResourcesNotFound.js
│   │   └── validate.js
│   ├── models/
│   ├── repository/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validations/
├── migrations/
├── seeders/
├── docs/
├── .env.example
├── .sequelizerc
├── package.json
└── README.md
```

The application follows a layered structure:

- **Routes** register HTTP paths and methods.
- **Controllers** handle requests, logging, and response formatting.
- **Services** contain business and filtering logic.
- **Repositories** provide the persistence boundary for Sequelize models.
- **Models** define database fields and associations.
- **Middlewares** handle JSON parsing, not-found requests, and exceptions.
- **Validation** modules define Zod schemas for request bodies, route parameters, and query strings.
- **Utils** contain shared response, logging, and pagination helpers.
