import { Elysia } from "elysia";
import { IdParamDTO } from "@core/dtos/generics";
import { CreateUserDTO, UpdateUserDTO } from "@users/dtos/user";
import { userService } from '@users/services/user';

export const userRoutes = new Elysia({ prefix: '/users' })
  .get("/", async () => {
    return await userService.findAll();
  })
  .get("/:id", async ({ params: { id } }: { params: { id: string } }) => {
    return await userService.findById(id);
  }, {
    params: IdParamDTO
  })
  .post("/", async ({ body }: { body: any }) => {
    return await userService.create(body);
  }, {
    body: CreateUserDTO
  })
  .put("/:id", async ({ params: { id }, body }: { params: { id: string }, body: any }) => {
    return await userService.update(id, body);
  }, {
    params: IdParamDTO,
    body: UpdateUserDTO
  })
  .delete("/:id", async ({ params: { id } }: { params: { id: string } }) => {
    await userService.delete(id);
    return { message: "Usuario eliminado exitosamente" };
  }, {
    params: IdParamDTO
  });
