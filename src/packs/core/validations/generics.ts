import { t } from "elysia";

export const IdParam = t.Object({
  id: t.String({
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  })
});

export const Pagination = t.Object({
  page: t.Number({ default: 1 }),
  limit: t.Number({ default: 10 })
});
