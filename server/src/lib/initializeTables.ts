import { createAvatarTable } from "../database/avatars";
import { createUserTable } from "../database/users";
import { pool } from "../database/db";
import type { QueryResult } from "pg";

const defaultAvatarUrl = "https://cdn.noitatnemucod.net/avatar/100x100/zoro_chibi/avatar-08.png"

// initialize avatar table 
const initializeAvatarTable = async (): Promise<void> => {
  try {
    await createAvatarTable();

    // check for default profile pic 
    const defaultAvatar: QueryResult = await pool.query("SELECT * FROM avatars WHERE avatar_url = $1", [defaultAvatarUrl as string]);

    if (defaultAvatar.rows.length === 0) {
      await pool.query("INSERT INTO avatars (anime, avatar_name, avatar_url) VALUES ($1, $2, $3)", ["one-piece", "default", defaultAvatarUrl as string]);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const initializeTables = async (): Promise<void> => {
  await initializeAvatarTable();
  await createUserTable();
  // NOTE: Check if there is a need to add
  // posts related tables or not?
}

export { defaultAvatarUrl, initializeTables };
