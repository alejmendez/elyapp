import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { db } from "@core/db";
import { User, users } from '@users/models/user';
import { createUser } from "@tests/factory";
import { fetchApi, fetchApiDelete, fetchApiPost, fetchApiPut } from "./helpers";

describe('User API', () => {
  let testUser: User;

  beforeAll(async () => {
    await db.delete(users).execute();
    testUser = await createUser({
      full_name: 'alejmendez',
      email: 'alejmendez@gmail.com',
      password: 'password123',
    });
  });

  afterAll(async () => {
    await db.delete(users).execute();
  });

  test('GET /api/v1/users returns list of users', async () => {
    const response = await fetchApi('users');
    const usersList = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(usersList)).toBe(true);
    expect(usersList[0].full_name).toBe('alejmendez');
  });

  test('GET /api/v1/users/:id returns specific user', async () => {
    const response = await fetchApi(`users/${testUser.id}`);
    const user = await response.json();

    expect(response.status).toBe(200);
    expect(user.full_name).toBe('alejmendez');
  });

  test('POST /api/v1/users creates new user', async () => {
    const newUser = {
      full_name: 'New User',
      email: 'new@example.com',
      password: 'password123'
    };

    const response = await fetchApiPost('users', newUser);

    const user = await response.json();

    expect(response.status).toBe(200);
    expect(user.full_name).toBe('New User');
    expect(user.email).toBe('new@example.com');
  });

  test('PUT /api/v1/users/:id updates a user', async () => {
    const newUser = await createUser({
      full_name: 'user test',
      email: 'usertest@gmail.com',
      password: 'password123',
    });

    const updatedUser = {
      full_name: 'user test updated',
      email: 'usertestupdated@gmail.com',
    };

    const response = await fetchApiPut(`users/${newUser.id}`, updatedUser);

    const user = await response.json();

    expect(response.status).toBe(200);
    expect(user.full_name).toBe('user test updated');
    expect(user.email).toBe('usertestupdated@gmail.com');
  });

  test('DELETE /api/v1/users/:id deletes a user', async () => {
    const newUser = await createUser({
      full_name: 'user test delete',
      email: 'usertestdelete@gmail.com',
      password: 'password123',
    });

    const response = await fetchApiDelete(`users/${newUser.id}`);

    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });
});
