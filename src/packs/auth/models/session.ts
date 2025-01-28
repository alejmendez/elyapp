import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { users } from '@users/models/user';

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  created_at: timestamp('created_at').defaultNow(),
  expires_at: timestamp('expires_at').notNull()
});

export type Session = typeof sessions.$inferSelect;
