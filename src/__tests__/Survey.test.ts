import request from "supertest";
import { getConnection } from "typeorm";
import app from "../app";

import createConnection from "../database";

describe("Surveys", () => {
  beforeAll(async () => {
    const connetion = await createConnection();
    await connetion.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      description: "Description Test 1",
      title: "Title Test 1",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should returns an array with all surveys registered!", async () => {
    await request(app).post("/surveys").send({
      description: "Description Test 2",
      title: "Title Test 2",
    });

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2);
  });
});
