import { t } from "elysia";

export const CreateUserDTO = t.Object({
  full_name: t.String({ minLength: 3, maxLength: 80 }),
  email: t.String({ maxLength: 100, format: 'email' }),
  password: t.String({ minLength: 6, maxLength: 60 })
});

export const UpdateUserDTO = t.Object({
  full_name: t.Optional(t.String({ minLength: 3, maxLength: 80 })),
  email: t.Optional(t.String({ maxLength: 100, format: 'email' })),
  password: t.Optional(t.String({ minLength: 6, maxLength: 60 }))
});
