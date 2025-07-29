# Inventory Management Backend

A comprehensive backend API for inventory management built with Node.js, Express, and PostgreSQL. Features JWT authentication, complete CRUD operations, and full Docker containerization. Includes a React frontend for testing and demonstration.

## ✨ Backend Features

- **JWT Authentication**: Secure user registration and login system
- **Product Management**: Complete CRUD operations for inventory items
- **Input Validation**: Comprehensive validation using express-validator
- **Database Integration**: PostgreSQL with proper schema design
- **API Documentation**: Interactive Swagger UI for testing
- **Docker Ready**: Containerized for easy deployment
- **Error Handling**: Centralized error handling middleware
- **Security**: Password hashing, SQL injection protection, CORS

## 🛠️ Tech Stack

**Backend**: Node.js, Express, JWT, bcryptjs, PostgreSQL  
**Documentation**: Swagger UI, OpenAPI 3.0  
**Deployment**: Docker, Docker Compose  
**Frontend**: React (for demonstration/testing)

## 📦 What's Included

- **Backend API** with authentication and product management endpoints
- **PostgreSQL Database** with automatic schema initialization
- **Docker Configuration** for backend deployment
- **API Documentation** with interactive Swagger UI
- **React Frontend** for testing and demonstration purposes

## 🚀 Quick Start (Backend Focus)

**Deploy the backend with Docker:**
```bash
git clone <repository-url>
cd fi_assignment

# Option 1: Backend only with external database
# First, set up environment file
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials

docker build -t inventory-backend .
docker run -p 8080:8080 --env-file backend/.env inventory-backend

# Option 2: Complete stack (Backend + Database + Frontend)
docker-compose up -d
```

**Access the backend:**
- 🔧 **Backend API**: http://localhost:8080
- 📚 **API Documentation**: http://localhost:8080/api-docs
- 🌐 **Frontend Demo**: http://localhost:3000 (if using docker-compose)

## 🐳 Backend Docker Deployment

### Primary: Backend Container

**Step 1: Environment Setup**
```bash
# Copy and configure environment file
cp backend/.env.example backend/.env

# Edit backend/.env with your values:
# DATABASE_URL=postgresql://username:password@host:port/database
# JWT_SECRET=your_super_secure_jwt_secret_key
# PORT=8080
```

**Step 2: Build and Run**
```bash
# Build the backend image
docker build -t inventory-backend .

# Run with environment file
docker run -p 8080:8080 --env-file backend/.env inventory-backend

# Alternative: Run with direct environment variables
docker run -p 8080:8080 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e JWT_SECRET="your_secret" \
  -e PORT=8080 \
  inventory-backend
```

### Complete Stack (Backend + Database + Frontend)

**No environment setup needed** - docker-compose handles everything:
```bash
# Start all services including database and frontend demo
docker-compose up -d

# View backend logs
docker-compose logs backend

# Stop all services
docker-compose down
```

## 📋 API Endpoints

### Authentication
- `POST /register` - Create new user account
- `POST /login` - User login (returns JWT token)

### Products (Requires Authentication)
- `GET /products` - List all products (with pagination)
- `POST /products` - Create new product
- `PUT /products/:id/quantity` - Update product quantity
- `DELETE /products/:id` - Delete product

### Documentation
- `GET /api-docs` - Interactive Swagger UI

## 🗄️ Database Schema

**Users Table:**
- `id` (Primary Key)
- `username` (Unique)
- `password_hash`

**Products Table:**
- `id` (Primary Key)
- `name`, `type`, `sku` (Unique)
- `description`, `image_url`
- `quantity`, `price`

## 🔧 Configuration

### Docker Compose Configuration
The `docker-compose.yml` includes:
- PostgreSQL database with persistent storage
- Backend API with environment configuration
- Frontend served via Nginx
- Custom network for secure communication

## 🚦 Usage

1. **Register**: Create a new user account
2. **Login**: Authenticate to access the inventory
3. **Add Products**: Create new inventory items with details
4. **Manage Inventory**: Update quantities, edit details, delete items
5. **API Access**: Use the backend API directly via Swagger docs

## 🛡️ Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Input validation on all endpoints
- SQL injection protection
- CORS configuration
- Environment-based secrets

## 🔍 Troubleshooting

**Container Issues:**
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs [service-name]

# Restart services
docker-compose restart
```

**Database Connection:**
- Ensure PostgreSQL container is running
- Check DATABASE_URL in docker-compose.yml
- Verify network connectivity between containers

**Frontend API Errors:**
- Confirm backend is accessible at http://localhost:8080
- Check REACT_APP_API_URL environment variable
- Verify JWT token is being sent with requests

## 📄 License

This project is licensed under the ISC License.

---

**Ready to manage your inventory! 🎉**
