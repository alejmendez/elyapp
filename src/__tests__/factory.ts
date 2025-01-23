import { db } from "../db";
import { users } from "../db/schema";
import type { User } from "../db/schema";

export async function createUser(override: Partial<User> = {}): Promise<User> {
  const [user] = await db.insert(users).values({
    full_name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    ...override
  }).returning();

  return user;
}
