import { Pool } from "pg";
import type { PoolConfig } from "pg";

const {
  POSTGRES_USER = "postgres",
  POSTGRES_PASSWORD,
  POSTGRES_HOST = "localhost",
  POSTGRES_DATABASE = "postit",
  POSTGRES_PORT = 5432,
} = process.env;

const config: PoolConfig = {
  user: POSTGRES_USER as string,
  password: POSTGRES_PASSWORD as string,
  host: POSTGRES_HOST as string,
  database: POSTGRES_DATABASE as string,
  port: Number(POSTGRES_PORT),
}

export const pool: Pool = new Pool(config);
