import { pool } from "../db/index.js";

export async function getAllBootcampers() {
  const sqlQuery =
    "SELECT * FROM bootcampers";
  const result = await pool.query(sqlQuery);
  const bootcampers = result.rows;
  return bootcampers;
}