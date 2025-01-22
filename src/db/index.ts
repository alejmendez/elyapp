import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL no está definida en las variables de ambiente');
}

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
