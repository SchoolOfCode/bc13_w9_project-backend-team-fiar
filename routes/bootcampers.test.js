import request from "supertest";
import app from "../App.js";
import { expect, test } from "@jest/globals";
import { pool } from "../db/index.js";

describe("GET api/bootcampers", function () {
  it("responds with array of bootcampers", async function () {
    const response = await request(app).get("/api/bootcampers");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
    for (let i = 0; i < response.body.payload.length; i++) {
      const postObject = response.body.payload[i];
      expect(postObject).toStrictEqual({
        id: expect.any(Number),
        username: expect.any(String),
        is_coach: expect.any(Boolean),
      });
    }
  });
});

describe("GET api/bootcampers", function () {
  it("responds with array of bootcampers at an ID", async function () {
    const response = await request(app).get("/api/bootcampers/2");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Object),
    });
    for (let i = 0; i < response.body.payload.length; i++) {
      const postObject = response.body.payload[i];
      expect(postObject).toStrictEqual({
        id: 2,
        username: expect.any(String),
        is_coach: expect.any(Boolean),
      });
    }
  });
});

describe("POST api/bootcampers", function () {
  it("Adds a bootcamper to the bootcampers table", async function () {
    const response = await request(app).post("/api/bootcampers").send({
      username: "Jill",
      is_coach: false,
    });
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      success: true,
      payload: {
        id: expect.any(Number),
        username: "Jill",
        is_coach: false,
      },
    });
  });
});

describe("PATCH api/bootcampers", function () {
  it("Edits a bootcamper on the bootcampers table", async function () {
    const response = await request(app).patch("/api/bootcampers/9").send({
      id: 9,
      username: "Janine",
      is_coach: false,
    });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      success: true,
      payload: {
        id: expect.any(Number),
        username: "Janine",
        is_coach: false,
      },
    });
  });
});

describe("DELETE api/bootcampers/{id}", function () {
  it("responds with the deleted bootcamper", async function () {
    const response = await request(app).delete("/api/bootcampers/9");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: {
        id: 9,
        username: "Janine",
        is_coach: false,
      },
    });
  });
});
//
afterAll(() => {
  pool.end();
});
