import { getConnection } from 'typeorm';
import request from "supertest";
import app from "../app";

import createConnection from "../database";

describe("Users", () => {
  beforeAll(async () => {
    const connetion = await createConnection();
    await connetion.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "User Test",
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new user with exists email", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "User Test",
    });

    expect(response.status).toBe(400);
  });
});
