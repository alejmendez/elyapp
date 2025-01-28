import { t } from "elysia";

export const LoginDTO = t.Object({
  email: t.String(),
  password: t.String()
});

export const TokenDTO = t.Object({
  token: t.String()
});
