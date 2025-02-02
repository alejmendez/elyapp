import { t } from "elysia";
import { IdParam as IdParamBase } from "@core/validations/generics";

export const CreateUser = t.Object({
  full_name: t.String(),
  email: t.String({
    transform: ({ value }: { value: string }) => value.toLowerCase()
  }),
  password: t.String(),
  role: t.Optional(t.String())
});

export const UpdateUser = t.Partial(CreateUser);

export const IdParam = IdParamBase;
