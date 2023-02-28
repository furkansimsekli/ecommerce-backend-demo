# ecommerce-backend-demo

This is an example Node.js backend app that serves for simple shopping app.

Please see [API documentation](https://github.com/furkansimsekli/ecommerce-backend-demo/blob/master/docs/api.md).

## Build
1. Fill in environment variables in `.env`
2. Install dependencies with `npm install` (use `npm install --production` if you are in production)
3. Run with `npm start` (using `npm run dev` is more convenient due to `nodemon`)

Example .env:
```bash
API_URL = ""
DB_URI = ""
PASSWORD_PEPPER = ""
PASSWORD_SALT = ""
JWT_SECRET = ""
```