import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Falta DATABASE_URL en variables de entorno');
  process.exit(1);
}

export const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('render.com') ? { rejectUnauthorized: false } : false
});

export async function initDb() {
  // Run schema on boot (idempotent) to ease grading
  const schema = await (await import('node:fs/promises')).readFile(new URL('../..//db/schema.sql', import.meta.url), 'utf-8');
  await pool.query(schema);
}
