import { User } from "@/packs/users/models/user";
import { UnauthorizedError } from "@core/errors/http.error";

export const authGuard = (roles: string[] = []) => {
  return (ctx: any) => {
    const currentUser = ctx.currentUser as User | undefined | null;
    if (!currentUser) {
      throw new UnauthorizedError('Unauthorized', 'current user not found');
    }

    if (roles.length > 0 && !roles.includes(currentUser.role)) {
      throw new UnauthorizedError('Unauthorized', 'current user has not the required role');
    }
  }
};
