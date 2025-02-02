import { t } from "elysia";

export const Login = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String()
});

export const Token = t.Object({
  token: t.String()
});
