module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/rentify',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || 'your_sendgrid_api_key',
    EMAIL_FROM: process.env.EMAIL_FROM || 'no-reply@rentify.com',
  };
  