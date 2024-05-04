import { pool } from "./db";

export const createAvatarTable = async (): Promise<void> => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS avatars (
                        id SERIAL PRIMARY KEY,
                        anime VARCHAR(50),
                        avatar_name VARCHAR(100) UNIQUE NOT NULL,
                        avatar_url VARCHAR(100) UNIQUE NOT NULL
                    )`);
  } catch (error) {
    console.error("Error creating avatar table:", error);
    throw error;
  }
}
