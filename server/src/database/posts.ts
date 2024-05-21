import { pool } from "./db";

export const createPostsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        dislikes INTEGER NOT NULL DEFAULT 0,
        user_id INTEGER NOT NULL REFERENCES users(id),
        created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
  } catch (error) {
    console.error("Error creating posts table.", error);
    throw error;
  }
}

export const createRepliesTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS replies (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES posts(id),
        parent_reply_id INTEGER DEFAULT NULL REFERENCES replies(id),
        body TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        dislikes INTEGER NOT NULL DEFAULT 0,
        user_id INTEGER NOT NULL REFERENCES users(id),
        created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
  } catch (error) {
    console.error("Error creating posts table.", error);
    throw error;
  }
}

export const createLikesTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        post_id INTEGER NOT NULL REFERENCES posts(id),
        parent_reply_id INTEGER DEFAULT NULL REFERENCES replies(id)
      )
    `)
  } catch (error) {
    console.error("Error creating likes table.", error);
    throw error;
  }
}

export const createDislikesTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS dislikes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        post_id INTEGER NOT NULL REFERENCES posts(id),
        parent_reply_id INTEGER DEFAULT NULL REFERENCES replies(id)
      )
    `)
  } catch (error) {
    console.error("Error creating likes table.", error);
    throw error;
  }
}

export const createTagsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tags (
          id SERIAL PRIMARY KEY,
          post_id INTEGER NOT NULL REFERENCES posts(id)
      )
    `)
  } catch (error) {
    console.error("Error creating tags table.", error);
    throw error;
  }
}
