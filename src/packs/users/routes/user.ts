import { Elysia } from "elysia";
import { CreateUser, IdParam, UpdateUser } from "@/packs/users/validations/user";
import { userService } from '@users/services/user';
import { authDerive } from "@auth/derives/auth";
import { authGuard } from "@auth/guards/auth";
// import { authMiddleware } from "@auth/middleware/auth";

export const userRoutes = new Elysia({ prefix: '/users' })
  .derive(authDerive)
  .guard({
    beforeHandle: authGuard()
  },
  (app) =>
    app
      .get("/", async () => {
        return await userService.findAll();
      })
      .get("/:id", async ({ params: { id } }) => {
        return await userService.findById(id);
      }, {
        params: IdParam
      })
      .post("/", async ({ body }) => {
        return await userService.create(body);
      }, {
        body: CreateUser
      })
      .put("/:id", async ({ params: { id }, body }) => {
        return await userService.update(id, body);
      }, {
        params: IdParam,
        body: UpdateUser
      })
      .delete("/:id", async ({ params: { id } }) => {
        await userService.delete(id);
        return { message: "Usuario eliminado exitosamente" };
      }, {
        params: IdParam
      })
  )
