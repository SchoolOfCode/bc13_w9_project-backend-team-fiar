import { pool } from './index.js'

export async function createCommentsTable () {
  // If you're unsure about CREATE TABLE IF NOT EXISTS, see: https://www.postgresql.org/docs/current/sql-createtable.html
  // If you're unsure about NOT NULL, see: https://www.postgresql.org/docs/current/ddl-constraints.html#id-1.5.4.6.6
  return await pool.query(
    `CREATE TABLE IF NOT EXISTS user_comments (
        comment_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        bootcamper_id INT REFERENCES bootcampers(id),
        post_id INT REFERENCES posts(post_id),
        contents VARCHAR(800),
        date_posted DATE
        );
        
        INSERT INTO user_comments (bootcamper_id, post_id, contents, date_posted)
        VALUES (4, 1, 'Yeah i love CSS too', '2022-11-22'), (6, 2, 'Disagree, I hate CQL', '2022-11-22');`
  )
}

export async function dropCommentsTable () {
  // If you're unsure about DROP TABLE, see: https://www.postgresql.org/docs/current/sql-droptable.html
  return await pool.query('DROP TABLE IF EXISTS user_comments CASCADE;')
}

export async function resetCommentsTable () {
  const dropped = await dropCommentsTable()
  const created = await createCommentsTable()
  return [dropped, created]
}

const test = await resetCommentsTable()
console.log(test)
