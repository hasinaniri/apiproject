import { pool } from "../config/db";
import { User, UserInput } from "../model/User";

export const UserRepository = {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE email = $1`,
      [email]
    );

    return result.rows[0] || null;
  },

  async findById(id: number): Promise<User | null> {
    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE id = $1`,
      [id]
    );

    return result.rows[0] || null;
  },

  async create(
    email: string,
    passwordHash: string
  ): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       RETURNING *`,
      [email, passwordHash]
    );

    return result.rows[0];
  },
};