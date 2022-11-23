import request from 'supertest'
import app from '../App.js'
import { expect, test } from '@jest/globals'
import { pool } from '../db/index.js'

// Testing array of all the posts

describe('GET api/posts', function () {
  it('responds with array of posts', async function () {
    const response = await request(app)
      .get('/api/posts')
    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      success: true, payload: expect.any(Array)
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

describe('GET api/posts?week=1', function () {
  it('responds with array of posts from week 1', async function () {
    const response = await request(app)
      .get('/api/posts?week=1')
    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      success: true, payload: expect.any(Array)
    })
    for (let i = 0; i < response.body.payload.length; i++) {
      const postObject = response.body.payload[i]
      expect(postObject).toStrictEqual({
        post_id: expect.any(Number),
        bootcamper_id: expect.any(Number),
        contents: expect.any(String),
        morning: expect.any(Boolean),
        week: 1,
        day_posted: expect.any(String),
        id: expect.any(Number),
        username: expect.any(String),
        is_coach: expect.any(Boolean)
      })
    }
  })
})

// Testing array of posts that contains CSS

describe('GET api/posts?content=css', function () {
  it('responds with array of posts that contains css', async function () {
    const response = await request(app)
      .get('/api/posts?content=css')
    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      success: true, payload: expect.any(Array)
    })
    for (let i = 0; i < response.body.payload.length; i++) {
      const postObject = response.body.payload[i]
      expect(postObject).toStrictEqual({
        post_id: expect.any(Number),
        bootcamper_id: expect.any(Number),
        contents: expect.stringMatching(/css/i),
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
  pool.end()
})
