import { pool } from './index.js'

export async function createBootcampersTable () {
  // If you're unsure about CREATE TABLE IF NOT EXISTS, see: https://www.postgresql.org/docs/current/sql-createtable.html
  // If you're unsure about NOT NULL, see: https://www.postgresql.org/docs/current/ddl-constraints.html#id-1.5.4.6.6
  return await pool.query(
    `CREATE TABLE IF NOT EXISTS bootcampers(
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(50),
        is_coach BOOLEAN
        );
        
        INSERT INTO bootcampers (username, is_coach) 
        VALUES ('flavia', true), ('rhona', true), ('remi', true), ('isaac', true), ('keira', false), ('nathan', false);`
  )
}

export async function dropBootcampersTable () {
  // If you're unsure about DROP TABLE, see: https://www.postgresql.org/docs/current/sql-droptable.html
  return await pool.query('DROP TABLE IF EXISTS bootcampers CASCADE;')
}

export async function resetBootcampersTable () {
  const dropped = await dropBootcampersTable()
  const created = await createBootcampersTable()
  return [dropped, created]
}
