import { db } from "@core/db";
import { users, User } from '@users/models/user';
import { eq } from 'drizzle-orm';

type CreateUserData = Pick<User, 'full_name' | 'email' | 'password'>;
type UpdateUserData = Partial<CreateUserData>;

export const userService = {
  async findAll(): Promise<User[]> {
    return await db.select().from(users);
  },

  async findById(id: string): Promise<User> {
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return user[0];
  },

  async create(data: CreateUserData): Promise<User> {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  },

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
  },

  async delete(id: string): Promise<void> {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (deletedUser.length === 0) {
      throw new Error("Usuario no encontrado");
    }
  }
};
