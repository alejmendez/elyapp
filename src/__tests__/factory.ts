import { db } from "@core/db";
import { users, User } from '@users/models/user';

export async function createUser(override: Partial<User> = {}): Promise<User> {
  override.password = await Bun.password.hash(override.password || 'password123');
  const [user] = await db.insert(users).values({
    full_name: 'Test User',
    email: 'test@example.com',
    password: override.password,
    ...override
  }).returning();

  return user;
}
