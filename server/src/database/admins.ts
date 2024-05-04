import { pool } from "./db";

export const createAdminTable = async (): Promise<void> => {
  try {
    await pool.query(`
                  CREATE TABLE IF NOT EXISTS admins (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(100) UNIQUE NOT NULL
                  )
                  `);
  } catch (error) {
    console.error("Error creating admin table:", error);
    throw error;
  }
}
