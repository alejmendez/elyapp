import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { logger } from "@tqman/nice-logger";

import { userRoutes } from "@users/routes/user";
import { authRoutes } from "@auth/routes/auth";
import { HttpError } from "@core/errors/http.error";

const isTest = process.env.NODE_ENV === 'test';

export const app = new Elysia()
  .use(cors())
  .onError(({ error, set }) => {
    if (error instanceof HttpError) {
      if (error.statusCode !== 404 && !isTest) {
        console.trace(error.stack);
      }
      set.status = error.statusCode;
      return {
        error: error.message,
        status: error.statusCode
      };
    }

    set.status = 500;
    return {
      error: 'Internal Server Error',
      status: 500
    };
  })
  .group("/api/v1", app => app
    .use(userRoutes)
    .use(authRoutes)
  );

if (!isTest) {
  const port = Number(process.env.APP_PORT || 4000);
  app
    .use(logger({
      mode: "live", // "live" or "combined" (default: "combined")
    }))
    .listen(port);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}
