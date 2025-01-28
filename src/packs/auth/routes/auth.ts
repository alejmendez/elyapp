import { Elysia } from "elysia";
import { authService } from "../services/auth";
import { LoginDTO, TokenDTO } from "../dtos/auth";

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post("/login", async ({ body }) => {
    return await authService.login(body);
  }, {
    body: LoginDTO
  })
  .post("/logout", async ({ body }) => {
    await authService.logout(body.token);
    return { message: "Sesión cerrada exitosamente" };
  }, {
    body: TokenDTO
  });
