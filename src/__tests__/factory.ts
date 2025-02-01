import { hash } from "bcrypt";

import { db } from "@core/db";
import { users, User } from '@users/models/user';
import { SALT_ROUNDS } from "@users/services/user";

export async function createUser(override: Partial<User> = {}): Promise<User> {
  override.password = await hash(override.password || 'password123', SALT_ROUNDS);
  const [user] = await db.insert(users).values({
    full_name: 'Test User',
    email: 'test@example.com',
    password: override.password,
    ...override
  }).returning();

  return user;
}
