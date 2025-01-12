# User Microservice
A scalable, standalone microservice for managing user data and authentication in the FlashGram platform.

## Description
The User Microservice handles user management, authentication, and profile operations in a microservice-based architecture. It supports CRUD operations on user data and token-based authentication.

Key features:
- token-based authentication.
- MongoDB as the database.
- Dockerized for portability and consistency.

## API Endpoints
### User Management APIs
1. **Create User**: `POST /users`
2. **Get User by ID**: `GET /users/:id`
3. **Update User**: `PUT /users/:id`
4. **Delete User**: `DELETE /users/:id`

### Authentication APIs
1. **Sign Up**: `POST /auth/signup`
2. **Login**: `POST /auth/login`
3. **Logout**: `POST /auth/logout`
