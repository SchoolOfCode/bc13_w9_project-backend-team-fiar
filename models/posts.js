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
