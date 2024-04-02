# User Management System

This is a user management system built with TypeScript, Express, Apollo GraphQL, and MongoDB. It allows for user registration, login, and retrieval of user information via a GraphQL API.

## Summary

The User Management System provides functionality for user registration, login, and retrieval of user information. It utilizes GraphQL for API queries and mutations, MongoDB for data storage, and JWT for authentication.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/user-management-system.git
   ```

2. **Install dependencies:**

   ```bash
   cd user-management-system
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and provide the following environment variables:

   ```plaintext
   PORT=1234
   MONGODB_URI=mongodb+srv://your-mongodb-uri
   JWT_SECRET=your_jwt_secret
   ```

   Replace `your-mongodb-uri` with your MongoDB connection URI and `your_jwt_secret` with a secure JWT secret key.

4. **Start the development server:**

   ```bash
   yarn dev
   ```

   This command will start the server in development mode using `nodemon` and `ts-node`.

## Project Structure

- `src/models/user.ts`: Defines the User model and schema for MongoDB.
- `src/resolvers/userInput.ts`: Defines the input type for user registration.
- `src/resolvers/userResolver.ts`: Contains GraphQL resolver functions for user queries and mutations.
- `src/schema/user.graphql`: GraphQL schema definitions for the User type.
- `src/utils/auth.ts`: Utility functions for JWT authentication.
- `src/utils/generateToken.ts`: Function to generate JWT tokens.
- `src/index.ts`: Entry point of the application, connects to MongoDB and starts the server.
- `src/server.ts`: Configures the Apollo Server and sets up GraphQL middleware.
- `.env.example`: Example environment variables file.

## Usage

Once the server is running locally, you can access the GraphQL Playground at `http://localhost:1234/graphql` (replace `1234` with your configured port). From there, you can execute queries and mutations to interact with the API.
