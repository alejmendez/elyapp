import { Elysia } from "elysia";
import { userRoutes } from "@users/routes/user";
import { authRoutes } from "@auth/routes/auth";
import { HttpError } from "@core/errors/http.error";

export const app = new Elysia()
  .onError(({ error, set }) => {
    if (error instanceof HttpError) {
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

if (process.env.NODE_ENV !== 'test') {
  const port = Number(process.env.APP_PORT || 4000);
  app.listen(port);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}
