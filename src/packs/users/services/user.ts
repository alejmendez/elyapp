import { db } from "@core/db";
import { users, User, UserWithoutPassword } from '@users/models/user';
import { eq } from 'drizzle-orm';
import { NotFoundError } from "@core/errors/http.error";
import { sessions } from "@/packs/auth/models/session";
import { CreateUser, UpdateUser } from '@/packs/users/validations/user';
import { Static } from "elysia";

export const userService = {
  async findAll(): Promise<UserWithoutPassword[]> {
    const usersList = await db.select().from(users);
    return usersList.map((user) => this.getUserWithoutPassword(user));
  },

  async findById(id: string): Promise<UserWithoutPassword> {
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length === 0) {
      throw new NotFoundError("Usuario no encontrado");
    }
    return this.getUserWithoutPassword(user[0]);
  },

  async create(data: Static<typeof CreateUser>): Promise<UserWithoutPassword> {
    const hashedPassword = await Bun.password.hash(data.password);
    const [user] = await db.insert(users)
      .values({ ...data, password: hashedPassword })
      .returning();
    return this.getUserWithoutPassword(user);
  },

  async update(id: string, data: Static<typeof UpdateUser>): Promise<UserWithoutPassword> {
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

  getUserWithoutPassword(user: User): UserWithoutPassword {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};
