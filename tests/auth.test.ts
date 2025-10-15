import supertest from "supertest";
import { web } from "./../src/applications/web.ts";
import { AppDataSource } from "../src/config/database.config.ts";

describe("POST /api/v1/auth/signup", () => {
  beforeAll(async() => {
    await AppDataSource.initialize();
  });

  test("", async () => {
    const response = await supertest(web).post("/api/v1/auth/signup").send({
    });
    expect(response.statusCode).toBe(400);
  });

  test("", async () => {
    const response = await supertest(web).post("/api/v1/auth/signup").send({
      "username": "user",
      "name": "user",
      "password": "user",
    });
    expect(response.statusCode).toBe(400);
  });

  test("", async () => {
    const response = await supertest(web).post("/api/v1/auth/signup").send({
      "username": "admin",
      "name": "admin",
      "password": "adminadmin",
    })
    expect(response.statusCode).toBe(400);
  });

  afterAll(async() => {
    await AppDataSource.destroy();
  });
});

