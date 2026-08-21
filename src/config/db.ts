import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connecte a la base de donnees PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Erreur inattendue du pool PostgreSQL", err);
});
