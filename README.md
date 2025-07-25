# Inventory Backend

A Node.js/Express backend for inventory management with JWT authentication, PostgreSQL, and a documented REST API.

## Features
- User registration and login (JWT-based)
- CRUD for products (with image, description, quantity, price, etc.)
- Input validation and consistent error handling
- Swagger/OpenAPI documentation
- Environment-based config with `.env` and `.env.example`

## Requirements
- Node.js (v16+ recommended)
- PostgreSQL database

## Setup
1. **Clone the repo and install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your real credentials.
   - Example:
     ```env
     DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require
     JWT_SECRET=your_jwt_secret
     PORT=8080
     ```
3. **Initialize the database:**
   - Run the SQL in `db_init.sql` to create tables.

4. **Start the server:**
   ```sh
   npm start
   # or
   node src/app.js
   ```

## API Documentation
- Swagger UI is available at: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)
- See `swagger.yaml` for the OpenAPI spec.

## Example API Requests

### Register
```sh
curl -X POST http://localhost:8080/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'
```

### Login
```sh
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'
```

### Add Product
```sh
curl -X POST http://localhost:8080/products \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Product",
    "type": "Electronics",
    "sku": "SKU123",
    "quantity": 10,
    "price": 99.99
  }'
```

### List Products
```sh
curl -X GET http://localhost:8080/products \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

### Update Product Quantity
```sh
curl -X PUT http://localhost:8080/products/1/quantity \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 20}'
```

### Delete Product
```sh
curl -X DELETE http://localhost:8080/products/1 \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Test Server API
- To run the server with a test config, create a `.env.test` file (see `.env.example`).
- Start the test server with:
  ```sh
  NODE_ENV=test node src/app.js
  # or (if you add a script)
  npm run test-server
  ```

## Development
- All secrets/config are managed via environment variables.
- All endpoints have input validation and consistent error responses.
- Contributions welcome!

## License
MIT 