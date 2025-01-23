import { Elysia, t } from "elysia";
import { db } from './db';
import { users } from './db/schema';
import { eq } from "drizzle-orm";

// DTOs
const IdParamDTO = t.Object({
  id: t.String()
});

const CreateUserDTO = t.Object({
  full_name: t.String(),
  email: t.String(),
  password: t.String()
});

const UpdateUserDTO = t.Object({
  full_name: t.Optional(t.String()),
  email: t.Optional(t.String()),
  password: t.Optional(t.String())
});

export const app = new Elysia()
  .group("/api/v1", app => app
    // GET all users
    .get("/users", async () => {
      const allUsers = await db.select().from(users);
      return allUsers;
    })

    // GET user by id
    .get("/users/:id", async ({ params: { id } }) => {
      const user = await db.select().from(users).where(eq(users.id, id));
      if (user.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      return user[0];
    }, {
      params: IdParamDTO
    })

    // POST create user
    .post("/users", async ({ body }) => {
      const newUser = await db.insert(users).values(body).returning();
      return newUser[0];
    }, {
      body: CreateUserDTO
    })

    // PUT update user
    .put("/users/:id", async ({ params: { id }, body }) => {
      const updatedUser = await db
        .update(users)
        .set({ ...body, updated_at: new Date() })
        .where(eq(users.id, id))
        .returning();

      if (updatedUser.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      return updatedUser[0];
    }, {
      params: IdParamDTO,
      body: UpdateUserDTO
    })

    // DELETE user
    .delete("/users/:id", async ({ params: { id } }) => {
      const deletedUser = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning();

      if (deletedUser.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      return { message: "Usuario eliminado exitosamente" };
    }, {
      params: IdParamDTO
    })
  );

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}
