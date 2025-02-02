import { db } from "@core/db";
import { users, User } from '@users/models/user';
import { eq } from 'drizzle-orm';
import { NotFoundError } from "@core/errors/http.error";
import { sessions } from "@/packs/auth/models/session";
import { CreateUser, UpdateUser } from '@/packs/users/validations/user';
import { Static } from "elysia";

export const userService = {
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const usersList = await db.select().from(users);
    return usersList.map((user) => this.getUserWithoutPassword(user));
  },

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length === 0) {
      throw new NotFoundError("Usuario no encontrado");
    }
    return this.getUserWithoutPassword(user[0]);
  },

  async create(data: Static<typeof CreateUser>): Promise<Omit<User, 'password'>> {
    const hashedPassword = await Bun.password.hash(data.password);
    const [user] = await db.insert(users)
      .values({ ...data, password: hashedPassword })
      .returning();
    return this.getUserWithoutPassword(user);
  },

  async update(id: string, data: Static<typeof UpdateUser>): Promise<Omit<User, 'password'>> {
    const updatedUser = await db
      .update(users)
      .set({ ...data, updated_at: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (updatedUser.length === 0) {
      throw new NotFoundError("Usuario no encontrado");
    }
    return this.getUserWithoutPassword(updatedUser[0]);
  },

  async delete(id: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.userId, id)).execute();

    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (deletedUser.length === 0) {
      throw new NotFoundError("Usuario no encontrado");
    }
  },

  getUserWithoutPassword(user: User): Omit<User, 'password'> {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};
