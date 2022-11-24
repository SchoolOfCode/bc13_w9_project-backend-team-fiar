import { pool } from './index.js'

export async function createPostsTable () {
  // If you're unsure about CREATE TABLE IF NOT EXISTS, see: https://www.postgresql.org/docs/current/sql-createtable.html
  // If you're unsure about NOT NULL, see: https://www.postgresql.org/docs/current/ddl-constraints.html#id-1.5.4.6.6
  return await pool.query(
    `CREATE TABLE IF NOT EXISTS posts (
        post_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        bootcamper_id INT REFERENCES bootcampers(id),
        contents VARCHAR(800),
        morning BOOLEAN,
        week INT,
        day_posted VARCHAR(10)
        );
        
        INSERT INTO posts (bootcamper_id, contents, morning, week, day_posted)
        VALUES (1, 'CSS is the best', true, 1, 'mon'), (2, 'I loooove SQL', false, 5, 'tues');`
  )
}

export async function dropPostsTable () {
  // If you're unsure about DROP TABLE, see: https://www.postgresql.org/docs/current/sql-droptable.html
  return await pool.query('DROP TABLE IF EXISTS posts CASCADE;')
}

export async function resetPostsTable () {
  const dropped = await dropPostsTable()
  const created = await createPostsTable()
  return [dropped, created]
}
