import { t } from "elysia";

export const IdParamDTO = t.Object({
  id: t.String({
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  })
});

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
