import { describe, expect, test, beforeAll, afterAll } from "bun:test";
import { db } from '../db';
import { users } from '../db/schema';
import { app } from '../index';

describe('API Tests', () => {
  beforeAll(async () => {
    // Limpiar la base de datos antes de las pruebas
    await db.delete(users);

    // Insertar datos de prueba
    await db.insert(users).values([
      {
        full_name: 'Usuario Test',
        email: 'test@example.com',
        password: 'password',
      },
      {
        full_name: 'Usuario Test 2',
        email: 'test2@example.com',
        password: 'password',
      }
    ]);

    // Iniciar el servidor
    app.listen(3000);
  });

  afterAll(async () => {
    // Limpiar la base de datos después de las pruebas
    await db.delete(users);
    // Cerrar el servidor
    await app.stop();
  });

  test('GET / returns hello message', async () => {
    const response = await fetch('http://localhost:3000/');
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(text).toBe('Hello Elysia');
  });

  test('GET /users returns list of users', async () => {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBe(2);

    expect(users[0]).toHaveProperty('full_name');
    expect(users[0]).toHaveProperty('email');
    expect(users[0].full_name).toBe('Usuario Test');
  });
});
