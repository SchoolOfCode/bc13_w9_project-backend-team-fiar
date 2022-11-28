import { pool } from '../db/index.js'

export async function getAllPosts () {
  const sqlQuery =
      `SELECT * FROM posts
      INNER JOIN bootcampers
      ON bootcampers.id = posts.bootcamper_id`
  const result = await pool.query(sqlQuery)
  const posts = result.rows
  return posts
}

export async function searchPostsByWeek (week) {
  const sqlQuery =
      `SELECT * FROM posts
      INNER JOIN bootcampers
      ON bootcampers.id = posts.bootcamper_id
      WHERE week = $1`
  const result = await pool.query(sqlQuery, [week])
  const posts = result.rows
  return posts
}

export async function searchPostsByContent (searchTerm) {
  const sqlQuery =
      `SELECT * FROM posts
      INNER JOIN bootcampers
      ON bootcampers.id = posts.bootcamper_id
      WHERE contents ILIKE $1`
  const result = await pool.query(sqlQuery, [`%${searchTerm}%`])
  const posts = result.rows
  return posts
}

export async function createPost (newPost) {
  const data = await pool.query(
    'INSERT INTO posts (bootcamper_id, contents, morning, week, day_posted) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
    [newPost.bootcamper_id, newPost.contents, newPost.morning, newPost.week, newPost.day_posted]
  )
  return data.rows[0]
}

export async function updatePost (postId, updatedPost) {
  const data = await pool.query(
    'UPDATE posts SET bootcamper_id = $1, contents = $2, morning = $3, week = $4, day_posted = $5 WHERE post_id = $6 RETURNING *;',
    [updatedPost.bootcamper_id, updatedPost.contents, updatedPost.morning, updatedPost.week, updatedPost.day_posted, postId]
  )
  return data.rows[0]
}

export async function deletePost (id) {
  const data = await pool.query(
    'DELETE FROM posts WHERE post_id = $1 RETURNING *;',
    [id]
  )
  return data.rows[0]
}
