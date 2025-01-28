import { db } from "@core/db";
import { sessions, Session } from '../models/session';
import { eq } from 'drizzle-orm';

export const sessionService = {
  async findByToken(token: string): Promise<Session | null> {
    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.token, token))
      .limit(1);

    return session || null;
  }
};
