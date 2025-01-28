import { db } from "@core/db";
import { users, User } from '@users/models/user';
import { sessions } from '../models/session';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { compare } from 'bcrypt';
import { userService } from '@users/services/user';
import { sessionService } from './session';
import { UnauthorizedError } from "@core/errors/http.error";

export const authService = {
  async login({ email, password }: { email: string; password: string }): Promise<{ user: User; token: string }> {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user.length) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    const isValid = await compare(password, user[0].password);

    if (!isValid) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    const token = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await db.insert(sessions).values({
      userId: user[0].id,
      token,
      expires_at: expiresAt
    });

    return { user: user[0], token };
  },

  async validateToken(token: string): Promise<User> {
    const session = await sessionService.findByToken(token);

    if (!session || session.expires_at < new Date()) {
      throw new UnauthorizedError('Sesión inválida o expirada');
    }

    return await userService.findById(session.userId);
  },

  async logout(token: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.token, token));
  },
};
