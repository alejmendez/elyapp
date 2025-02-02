import { Elysia } from "elysia";
import { authService } from "../services/auth";
import { Login, Token } from "../validations/auth";

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post("/login", async ({ body }) => {
    return await authService.login(body);
  }, {
    body: Login
  })
  .post("/logout", async ({ body }) => {
    await authService.logout(body.token);
    return { message: "Sesión cerrada exitosamente" };
  }, {
    body: Token
  });
