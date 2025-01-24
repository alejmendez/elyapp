import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const userHandlers = {
  getAll: async () => {
    const allUsers = await db.select().from(users);
    return allUsers;
  },

  getById: async ({ params: { id } }: { params: { id: string } }) => {
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return user[0];
  },

  create: async ({ body }: { body: any }) => {
    const newUser = await db.insert(users).values(body).returning();
    return newUser[0];
  },

  update: async ({ params: { id }, body }: { params: { id: string }, body: any }) => {
    const updatedUser = await db
      .update(users)
      .set({ ...body, updated_at: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (updatedUser.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return updatedUser[0];
  },

  delete: async ({ params: { id } }: { params: { id: string } }) => {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (deletedUser.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return { message: "Usuario eliminado exitosamente" };
  }
};
