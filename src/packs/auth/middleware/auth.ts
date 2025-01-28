import { Elysia } from "elysia";
import { authService } from "../services/auth";

export const authMiddleware = new Elysia()
  .derive(async ({ headers }) => {
    const token = headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Token no proporcionado');
    }

    const user = await authService.validateToken(token);

    return { user };
  });
