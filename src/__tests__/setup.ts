import { beforeAll } from "bun:test";
import postgres from 'postgres';

const rootClient = postgres('postgres://postgres:postgres@localhost:5432/postgres');

beforeAll(async () => {
  // Crear la base de datos de pruebas si no existe
  try {
    await rootClient.unsafe(`CREATE DATABASE elyapp_test`);
  } catch (error: any) {
    // Ignorar error si la base de datos ya existe
    if (!error.message.includes('already exists')) {
      throw error;
    }
  }

  // Cerrar la conexión root
  await rootClient.end();
});
