# Lab_ExpressJS

Small Express.js lab project for the NodeJS course. Implements basic user, posts and donation routes, middleware, services and simple view/email templates for learning purposes.

## Prerequisites

- Node.js (v14+ recommended)
- npm (or yarn)

## Setup

1. Open a terminal and change to the project folder:

```bash
cd Lab_ExpressJS
```

2. Install dependencies:

```bash
npm install
```

## Run

- Start the app with the package script (if defined):

```bash
npm start
```

- Or run directly with Node:

```bash
node src/server.js
```

- During development you can use nodemon (if installed globally):

```bash
npx nodemon src/server.js
```

The server listens on the port defined by the `PORT` environment variable or defaults to `3000`.

## Project Structure (important files)

- `src/app.js` - Express application and middleware registration
- `src/server.js` - Server bootstrap (starts the HTTP server)
- `src/routes/` - Route definitions (`users`, `posts`, `donation`)
- `src/controllers/` - Route handlers
- `src/services/` - Business logic and data access helpers
- `src/models/` - Data models (in-memory JSON or schema helpers)
- `src/middlewares/` - Express middlewares (authentication, logging, validation, error handling)
- `src/utils/` - Utility helpers and APIError helper
- `src/validators/` - Request validation schemas
- `src/views/` - Email templates and view files

## Typical API Endpoints

The app includes common CRUD routes. Example endpoints (prefixes may vary depending on route mounting):

- `GET /api/v1/users` - List users
- `GET /api/v1/users/:id` - Get a user
- `POST /api/v1/users` - Create a user
- `PUT /api/v1/users/:id` - Update a user
- `DELETE /api/v1/users/:id` - Delete a user

- `GET /api/v1/posts` - List posts
- `POST /api/v1/posts` - Create a post

- `GET /api/v1/donations` - List donations
- `POST /api/v1/donations` - Create a donation

Check the files in `src/routes/` for exact route paths and middleware usage.

## Environment

- `PORT` — Server port (default `3000`)
- `NODE_ENV` — `development` or `production`

## Contributing

1. Create a branch for your feature/fix.
2. Run tests (if any) and ensure linting passes.
3. Open a pull request with a clear description.

## Notes

- This repository is a learning lab; adapt scripts and structure as needed for production use.

## License

MIT
