import { Elysia } from "elysia";
import { userRoutes } from "@packs/users/routes/user";

const app = new Elysia().use(userRoutes);

export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}
