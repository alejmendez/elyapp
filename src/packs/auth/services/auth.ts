import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { compare } from "bcrypt";
import { eq } from 'drizzle-orm';

import { db } from "@core/db";
import { users, User } from '@users/models/user';
import { sessions } from '@auth/models/session';
import { userService } from '@users/services/user';
import { sessionService } from '@auth/services/session';
import { UnauthorizedError } from "@core/errors/http.error";

const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30;

export const authService = {
  async login({ email, password }: { email: string; password: string }): Promise<{ user: User; token: string }> {
    const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!userList.length) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    const user = userList[0];
    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    const token = authService.generateSessionToken();

    await authService.createSession(token, user.id);

    return { user: user, token };
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

  generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
  },

  async createSession(token: string, userId: string): Promise<void> {
    await db.insert(sessions).values({
      userId,
      token,
      created_at: new Date(),
      expires_at: new Date(Date.now() + SESSION_EXPIRATION_TIME)
    });
  }
};
