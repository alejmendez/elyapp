import { Elysia } from "elysia";
import { userRoutes } from "./routes/user.routes";

const app = new Elysia().use(userRoutes);

export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}
