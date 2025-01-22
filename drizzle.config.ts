import type { Config } from 'drizzle-kit';

const isTest = process.env.NODE_ENV === 'test';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: isTest ? 'elyapp_test' : (process.env.DB_NAME || 'elyapp'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },
} satisfies Config;
