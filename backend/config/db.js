import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL } = process.env;

// Use the full connection string from .env
export const sql = neon(DATABASE_URL);

// this sql function we export is used as a tagged template literal
// which allows us to write sql queries in a more readable way