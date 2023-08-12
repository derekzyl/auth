## **Installation and Startup Documentation for User Authentication and Two-Factor Authorization System**

This documentation provides step-by-step instructions on how to install, set up, and run the User Authentication and Two-Factor Authorization system using Apollo Server, MongoDB, and TypeScript.

### **Table of Contents:**

1. [Prerequisites](#prerequisite)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Usage](#usage)
6. [Security Considerations](#security-considerations)
7. [Conclusion](#conclusion)

### **Prerequisites**

- Node.js and npm installed on your machine
- MongoDB installed and running
- Basic understanding of GraphQL and TypeScript

### **Installation**

1. Clone or download the project repository from [GitHub](https://github.com/derekzyl/auth).
2. Navigate to the project directory using your terminal.

### **Configuration**

1. Rename `.env.example` to `.env` and modify the configuration settings as needed (e.g., MongoDB connection URI, JWT secret).

### **Running the Application**

1. Open your terminal and navigate to the project directory.
2. Run `npm install` to install project dependencies.
3. Run `npm run dev` to start the Apollo Server in typescript.
4. Run `npm run start:dev` to  build to javascript and start the Apollo Server with nodemon.
5. Run `npm run start:prod` to  build to javascript and start the Apollo Server with node.

### **Usage**

1. The GraphQL playground will be accessible at `http://localhost:5000/`.
2. Use the playground to test and execute the provided queries and mutations for user registration, login, password change, and two-factor authentication.

- **auth query**

```ts
mutation RegisterUser($data: userRegisterBody!) {
  Register(data: $data) {
    success_status
    data
    message
  }
}

mutation LoginUser($data: userLoginBody!) {
  Login(data: $data) {
    success_status
    data {
      token
    }
    message
  }
}

mutation LoginWithOtp($data: userLoginBody!) {
  LoginWithOtp(data: $data) {
    success_status
    data {
      token
    }
    message
  }
}

mutation ChangePassword($data: userChangePasswordBody!) {
  ChangePassword(data: $data) {
    success_status
    data {
      message
    }
    message
  }
}

mutation GenerateQrCode {
  GenerateQrCode {
    success_status
    data {
      qr
    }
    message
  }
}

```

- **Type definitions**

```graphql
// schema.ts

type User {
  id: ID!
  username: String!
  password: String!
  secretKey: String
}

type Query {
  getUser(username: String): User
}

type Error {
  error: String
}

type Token {
  token: String
}

type LoginResponse {
  message: String
  data: Token
  success: Boolean
  error: Error
}

type Qr {
  qr: String
}

type QrResponse {
  message: String
  data: Qr
  success: Boolean
  error: Error
}

type PwdCh {
  message: String
}

type PasswordChangeResponse {
  message: String
  data: PwdCh
  success: Boolean
  error: Error
}

type Mutation {
  Register(email: String!, password: String!): LoginResponse
  GenerateQrCode(username: String): QrResponse
  Login(email: String!, password: String!): LoginResponse
  ChangePassword(password: String, new_password: String): PasswordChangeResponse
  LoginWithOtp(email: String!, password: String!, otp: String!): LoginResponse
}


 ```

### **Security Considerations**

1. Keep the `.env` file secure and never expose sensitive information publicly.
2. Implement proper error handling and input validation in your code.
3. Use HTTPS for production deployments to ensure data security during transmission.

### **Conclusion**

Congratulations! You have successfully installed, configured, and launched the User Authentication and Two-Factor Authorization system using Apollo Server, MongoDB, and TypeScript. Feel free to explore the GraphQL API and extend the functionality as needed.

For any issues or inquiries, please refer to the project's GitHub repository or contact our support team at [my email](cybersgenii@gmail.com).
