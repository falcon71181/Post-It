import { pool } from "./db";

export const createUserTable = async (): Promise<void> => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        middle_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        registered_on TIMESTAMPTZ NOT NULL,
        avatar_id INT DEFAULT 1,
        FOREIGN KEY (avatar_id) REFERENCES avatars(id)
      )
    `);
  } catch (error) {
    console.error("Error creating user table:", error);
    throw error;
  }
}
