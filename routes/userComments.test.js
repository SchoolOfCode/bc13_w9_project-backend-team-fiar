import request from 'supertest'
import app from '../App.js'
import { expect, test } from '@jest/globals'
import { pool } from '../db/index.js'

describe('GET api/comments', function () {
  it('responds with array of all comments', async function () {
    const response = await request(app).get('/api/comments')
    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array)
    })
    for (let i = 0; i < response.body.payload.length; i++) {
      const postObject = response.body.payload[i]
      expect(postObject).toStrictEqual({
        comment_id: expect.any(Number),
        bootcamper_id: expect.any(Number),
        post_id: expect.any(Number),
        contents: expect.any(String),
        date_posted: '2022-11-22T03:00:00.000Z',
        id: expect.any(Number),
        is_coach: expect.any(Boolean),
        username: expect.any(String)
      })
    }
  })
})

describe('GET api/comments/some_id', function () {
  it('responds with array of all comments from a specific post ID', async function () {
    const response = await request(app).get('/api/comments/1')
    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array)
    })
    for (let i = 0; i < response.body.payload.length; i++) {
      const postObject = response.body.payload[i]
      expect(postObject).toStrictEqual({
        comment_id: expect.any(Number),
        bootcamper_id: expect.any(Number),
        post_id: expect.any(Number),
        contents: expect.any(String),
        date_posted: '2022-11-22T03:00:00.000Z'
      })
    }
  })
})

// describe('POST api/comments', function () {
//   it('Adds a comment to the user_comments table', async function () {
//     const response = await request(app).post('/api/comments').send({
//       bootcamper_id: 2,
//       post_id: 2,
//       contents: 'I know a cool React Hook for this!',
//       date_posted: '2022-11-22T03:00:00.000Z'
//     })
//     expect(response.status).toEqual(201)
//     expect(response.body).toEqual({
//       success: true,
//       payload: {
//         comment_id: expect.any(Number),
//         bootcamper_id: 2,
//         post_id: 2,
//         contents: 'I know a cool React Hook for this!',
//         date_posted: '2022-11-22T03:00:00.000Z'
//       }
//     })
//   })
// })

// describe('PATCH api/comments', function () {
//   it('Edits a comment on the user_comments table', async function () {
//     const response = await request(app).patch('/api/comments/10').send({
//       post_id: 2,
//       bootcamper_id: 2,
//       contents: "I know a cool React Hook for this, it's great! Let me just test it",
//       date_posted: '2022-11-22T03:00:00.000Z'
//     })
//     expect(response.status).toEqual(200)
//     expect(response.body).toEqual({
//       success: true,
//       payload: {
//         comment_id: 10,
//         post_id: 2,
//         bootcamper_id: 2,
//         contents: "I know a cool React Hook for this, it's great! Let me just test it",
//         date_posted: '2022-11-22T03:00:00.000Z'
//       }
//     })
//   })
// })

// describe('DELETE api/comments/{id}', function () {
//   it('responds with the deleted comment', async function () {
//     const response = await request(app).delete('/api/comments/10')
//     expect(response.status).toEqual(200)
//     expect(response.body).toStrictEqual({
//       success: true,
//       payload: {
//         comment_id: 10,
//         bootcamper_id: 2,
//         post_id: 2,
//         contents: "I know a cool React Hook for this, it's great! Let me just test it",
//         date_posted: '2022-11-22T03:00:00.000Z'
//       }
//     })
//   })
// })

afterAll(() => {
  pool.end()
})
