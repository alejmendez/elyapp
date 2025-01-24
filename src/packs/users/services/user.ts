import { db } from '../../../db';
import { users } from '../models/user';
import { eq } from 'drizzle-orm';
import type { User } from '../models/user';

type CreateUserData = Pick<User, 'full_name' | 'email' | 'password'>;
type UpdateUserData = Partial<CreateUserData>;

export class UserService {
  async findAll(): Promise<User[]> {
    return await db.select().from(users);
  }

  async findById(id: string): Promise<User> {
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return user[0];
  }

  async create(data: CreateUserData): Promise<User> {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    const updatedUser = await db
      .update(users)
      .set({ ...data, updated_at: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (updatedUser.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return updatedUser[0];
  }

  async delete(id: string): Promise<void> {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (deletedUser.length === 0) {
      throw new Error("Usuario no encontrado");
    }
  }
}

export const userService = new UserService();
