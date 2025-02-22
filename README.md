# API Project

This project is a Node.js application that provides APIs for user authentication with OTP, payment processing, and periodic fund transfers. The application uses MongoDB as the database and JWT for user authentication.

## Features

- **Login with OTP**: Users can log in using their phone numbers. An OTP is sent to their phone, which they need to verify to log in. A JWT token is generated upon successful verification.
- **Payment Processing**: Handles payments, splitting the amount into merchant, user, and commission shares.
- **Fund Transfers**: Periodically transfers allocated funds to respective parties using a cron job.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/api-project.git
   cd api-project
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```env
PORT=5000
MONGO_URI=mongodb+srv://rathorsr143sr:rathorsr005@cluster0.voxostv.mongodb.net/APIs?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=randomstringtohandlejwt

   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Auth Routes

#### POST /api/auth/login

Generate OTP for login.

- **Request Body**:

  ```json
  {
    "phoneNumber": "user_phone_number"
  }
  ```

- **Response**:
  ```json
  {
    "message": "OTP sent"
  }
  ```

#### POST /api/auth/verify

Verify OTP and generate JWT token.

- **Request Body**:

  ```json
  {
    "phoneNumber": "user_phone_number",
    "otp": "received_otp"
  }
  ```

- **Response**:
  ```json
  {
    "token": "jwt_token"
  }
  ```

### Payment Routes

#### POST /api/payment

Process payment and split amount into merchant, user, and commission shares.
**Request Header**:
Authentication : Bearer "jwt_token"

- **Request Body**:

  ```json
  {
    "amount": "total_amount"
  }
  ```

- **Response**:
  ```json
  {
    "message": "Payment successful",
    "merchantShare": "amount_to_merchant",
    "userShare": "amount_to_user",
    "commission": "commission_amount"
  }
  ```

### Transfer Routes

Fund transfers are handled by a cron job that runs periodically. No additional endpoint is needed for this.
