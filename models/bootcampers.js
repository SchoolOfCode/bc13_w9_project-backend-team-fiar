import { pool } from '../db/index.js'

export async function getAllBootcampers () {
  const sqlQuery =
    'SELECT * FROM bootcampers'
  const result = await pool.query(sqlQuery)
  const bootcampers = result.rows
  return bootcampers
}

export async function getBootcamperByID (id) {
  const data = await pool.query(
    'SELECT * FROM bootcampers WHERE id = $1',
    [id]
  )
  return data.rows[0]
}

export async function createUser (newUser) {
  const data = await pool.query(
    'INSERT INTO bootcampers (username, is_coach) VALUES ($1, $2) RETURNING *;',
    [newUser.username, newUser.is_coach]
  )
  return data.rows[0]
}

export async function updateBootcamper (id, updatedBootcamper) {
  const data = await pool.query(
    'UPDATE bootcampers SET username = $1, is_coach = $2 WHERE id = $3 RETURNING *;',
    [updatedBootcamper.username, updatedBootcamper.is_coach, id]
  )
  return data.rows[0]
}

export async function deleteBootcamper (id) {
  const data = await pool.query(
    'DELETE FROM bootcampers WHERE id = $1 RETURNING *;',
    [id]
  )
  return data.rows[0]
}
