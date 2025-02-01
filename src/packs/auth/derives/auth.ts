import { authService } from "../services/auth"

export const authDerive = async ({ headers }: { headers: { authorization?: string } }) => {
  const token = headers.authorization ?? ''

  const currentUser = await authService.validateToken(token)
  return {
      token,
      currentUser,
  }
}
