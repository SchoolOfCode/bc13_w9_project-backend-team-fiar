import request from "supertest"
import app from "../App.js"
import { expect, test } from "@jest/globals"
import { pool } from "../db/index.js";

describe('GET api/posts', function() {
    it('responds with array of posts', async function() {
        const response = await request(app)
            .get('/api/posts')
            expect(response.status).toEqual(200)
            expect(response.body).toStrictEqual({
                success: true, payload: expect.any(Array)
            })
            for (let i=0; i<response.body.payload.length; i++) {
                const postObject = response.body.payload[i]
                expect(postObject).toStrictEqual({
                    post_id: expect.any(Number), 
                    bootcamper_id: expect.any(Number),
                    contents: expect.any(String),
                    morning: expect.any(Boolean),
                    week: expect.any(Number),
                    day_posted: expect.any(String),
                    id: expect.any(Number),
                    username: expect.any(String),
                    is_coach: expect.any(Boolean)
                })
            }
    })
})

afterAll(() => {
    pool.end();
  });