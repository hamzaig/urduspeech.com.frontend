# MongoDB Setup Guide

## Prerequisites

1. **Install MongoDB** (if not already installed):

   - **macOS**: `brew install mongodb-community`
   - **Windows**: Download from [MongoDB website](https://www.mongodb.com/try/download/community)
   - **Linux**: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB service**:
   - **macOS**: `brew services start mongodb-community`
   - **Windows**: MongoDB runs as a service
   - **Linux**: `sudo systemctl start mongod`

## Environment Configuration

Create a `.env.local` file in the root directory with the following content:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/urduspeech

# JWT Secret (generate a secure secret for production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development
```

## Database Setup

1. **Install dependencies** (already done):

   ```bash
   npm install mongodb mongoose
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Verify MongoDB connection**:
   - Check the console for "MongoDB connected successfully" message
   - The database and collections will be created automatically

## Features Implemented

### User Management

- ✅ User registration with password hashing
- ✅ User login with JWT authentication
- ✅ Password reset functionality
- ✅ Email validation and password strength requirements

### Database Operations

- ✅ MongoDB connection with connection pooling
- ✅ User model with proper validation
- ✅ Secure password reset token storage
- ✅ Automatic database initialization

### API Endpoints

- ✅ `POST /api/auth/register` - User registration
- ✅ `POST /api/auth/login` - User login
- ✅ `POST /api/auth/forgot-password` - Request password reset
- ✅ `POST /api/auth/reset-password` - Reset password with token

## Security Features

- **Password Hashing**: Uses bcryptjs for secure password storage
- **JWT Tokens**: Secure authentication tokens
- **Reset Tokens**: Cryptographically secure reset tokens with expiration
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: Secure error messages that don't leak information

## Production Considerations

1. **MongoDB Atlas**: Use MongoDB Atlas for production hosting
2. **Environment Variables**: Use proper environment variables for production
3. **JWT Secret**: Generate a strong, random JWT secret
4. **Email Service**: Implement proper email sending for password resets
5. **Rate Limiting**: Add rate limiting to prevent abuse
6. **HTTPS**: Ensure all communications use HTTPS

## Troubleshooting

### Connection Issues

- Ensure MongoDB is running: `brew services list` (macOS)
- Check MongoDB logs: `tail -f /usr/local/var/log/mongodb/mongo.log`
- Verify connection string in `.env.local`

### Database Errors

- Check if database exists: `mongo urduspeech --eval "db.users.find()"`
- Reset database if needed: `mongo urduspeech --eval "db.dropDatabase()"`

### Development vs Production

- Development uses local MongoDB
- Production should use MongoDB Atlas or self-hosted MongoDB
- Update `MONGODB_URI` for production environment
