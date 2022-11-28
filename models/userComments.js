import { pool } from '../db/index.js'

export async function getAllComments () {
  const sqlQuery = `SELECT * FROM user_comments
        INNER JOIN bootcampers
        ON bootcampers.id = user_comments.bootcamper_id`
  const result = await pool.query(sqlQuery)
  const posts = result.rows
  return posts
}

export async function getCommentByPostID (id) {
  const data = await pool.query('SELECT * FROM user_comments WHERE post_id = $1', [
    id
  ])
  return data.rows
}

export async function createComment (newComment) {
  const data = await pool.query(
    'INSERT INTO user_comments (bootcamper_id, post_id, contents, date_posted) VALUES ($1, $2, $3, $4) RETURNING *;',
    [newComment.bootcamper_id, newComment.post_id, newComment.contents, newComment.date_posted]
  )
  return data.rows[0]
}

export async function updateComment (commentId, updatedComment) {
  const data = await pool.query(
    'UPDATE user_comments SET bootcamper_id = $1, post_id = $2, contents = $3, date_posted = $4 WHERE comment_id = $5 RETURNING *;',
    [updatedComment.bootcamper_id, updatedComment.post_id, updatedComment.contents, updatedComment.date_posted, commentId]
  )
  return data.rows[0]
}

export async function deletePost (id) {
  const data = await pool.query(
    'DELETE FROM user_comments WHERE comment_id = $1 RETURNING *;',
    [id]
  )
  return data.rows[0]
}
