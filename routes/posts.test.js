import request from 'supertest'
import app from '../App.js'
import { expect, test } from '@jest/globals'
import { pool } from '../db/index.js'

// Testing array of all the posts

describe('GET api/posts', function () {
  it('responds with array of posts', async function () {
    const response = await request(app).get('/api/posts')
    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array)
    })
    for (let i = 0; i < response.body.payload.length; i++) {
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

// Testing array of posts from week 1

// describe("GET api/posts?week=1", function () {
//   it("responds with array of posts from week 1", async function () {
//     const response = await request(app).get("/api/posts?week=1");
//     expect(response.status).toEqual(200);
//     expect(response.body).toStrictEqual({
//       success: true,
//       payload: expect.any(Array),
//     });
//     for (let i = 0; i < response.body.payload.length; i++) {
//       const postObject = response.body.payload[i];
//       expect(postObject).toStrictEqual({
//         post_id: expect.any(Number),
//         bootcamper_id: expect.any(Number),
//         contents: expect.any(String),
//         morning: expect.any(Boolean),
//         week: 1,
//         day_posted: expect.any(String),
//         id: expect.any(Number),
//         username: expect.any(String),
//         is_coach: expect.any(Boolean),
//       });
//     }
//   });
// });

// // Testing array of posts that contains CSS

// describe("GET api/posts?content=css", function () {
//   it("responds with array of posts that contains css", async function () {
//     const response = await request(app).get("/api/posts?content=css");
//     expect(response.status).toEqual(200);
//     expect(response.body).toStrictEqual({
//       success: true,
//       payload: expect.any(Array),
//     });
//     for (let i = 0; i < response.body.payload.length; i++) {
//       const postObject = response.body.payload[i];
//       expect(postObject).toStrictEqual({
//         post_id: expect.any(Number),
//         bootcamper_id: expect.any(Number),
//         contents: expect.stringMatching(/css/i),
//         morning: expect.any(Boolean),
//         week: expect.any(Number),
//         day_posted: expect.any(String),
//         id: expect.any(Number),
//         username: expect.any(String),
//         is_coach: expect.any(Boolean),
//       });
//     }
//   });
// });

// describe("POST api/posts", function () {
//   it("Adds a post to the posts table", async function () {
//     const response = await request(app).post("/api/posts").send({
//       bootcamper_id: 3,
//       contents: "Cypress is just urgh",
//       morning: false,
//       week: 5,
//       day_posted: "wed",
//     });
//     expect(response.status).toEqual(201);
//     expect(response.body).toEqual({
//       success: true,
//       payload: {
//         post_id: expect.any(Number),
//         bootcamper_id: 3,
//         contents: "Cypress is just urgh",
//         morning: false,
//         week: 5,
//         day_posted: "wed",
//       },
//     });
//   });
// });

// describe("PATCH api/posts", function () {
//   it("Edits a post on the posts table", async function () {
//     const response = await request(app).patch("/api/posts/5").send({
//       post_id: 5,
//       bootcamper_id: 3,
//       contents: "Cypress is just urgh oohmygod!",
//       morning: true,
//       week: 5,
//       day_posted: "tue",
//     });
//     expect(response.status).toEqual(200);
//     expect(response.body).toEqual({
//       success: true,
//       payload: {
//         post_id: expect.any(Number),
//         bootcamper_id: 3,
//         contents: "Cypress is just urgh oohmygod!",
//         morning: true,
//         week: 5,
//         day_posted: "tue",
//       },
//     });
//   });
// });

// describe('DELETE api/posts/{id}', function () {
//   it('responds with the deleted post', async function () {
//     const response = await request(app).delete('/api/posts/10')
//     expect(response.status).toEqual(200)
//     expect(response.body).toStrictEqual({
//       success: true,
//       payload: {
//         post_id: 10,
//         bootcamper_id: 3,
//         contents: 'Cypress is just urgh',
//         morning: false,
//         week: 5,
//         day_posted: 'wed'
//       }
//     })
//   })
// })

afterAll(() => {
  pool.end()
})
