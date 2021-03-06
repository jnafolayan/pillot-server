import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || '8080';

export const dbURL = process.env.DB_URL;

export const jwtSecret = process.env.JWT_SECRET;
