import { db } from "@core/db";
import { users, User } from '@users/models/user';

export async function createUser(override: Partial<User> = {}): Promise<User> {
  const [user] = await db.insert(users).values({
    full_name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    ...override
  }).returning();

  return user;
}
