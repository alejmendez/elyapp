import { userService } from "@users/services/user";

async function createUser() {
  const args = process.argv.slice(2);
  const [full_name, email, password, role = 'normal'] = args;

  if (!full_name || !email || !password) {
    console.error('Uso: bun run create-user <full_name> <email> <password> [role]');
    console.error('Ejemplo: bun run create-user "John Doe" john@example.com password123 admin');
    process.exit(1);
  }

  try {
    const user = await userService.create({
      full_name,
      email,
      password,
      role
    });

    console.log('Usuario creado exitosamente:');
    console.log({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role
    });

    process.exit(0);
  } catch (error: any) {
    console.error('Error al crear usuario:', error.message);
    process.exit(1);
  }
}

createUser();
