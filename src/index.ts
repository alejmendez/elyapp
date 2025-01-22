import { Elysia } from "elysia";
import { db } from './db';
import { users } from './db/schema';

export const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/users", async () => {
    const allUsers = await db.select().from(users);
    return allUsers;
  });

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}
