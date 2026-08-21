import { pool } from "../config/db";
import { Student, StudentInput } from "../model/Student";

export const StudentRepository = {
  async findAll(): Promise<Student[]> {
    const result = await pool.query("SELECT * FROM Students ORDER BY id");
    return result.rows;
  },

  async findById(id: number): Promise<Student | null> {
    const result = await pool.query("SELECT * FROM Students WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  async create(data: StudentInput[]): Promise<Student[]> {
    const values: string[] = [];
    const params: any[] = [];

    data.forEach((Student, index) => {
      const offset = index * 3;

      values.push(`($${offset + 1}, $${offset + 2}, $${offset + 3})`);

      params.push(
        Student.nom,
        Student.prenom,
        Student.email
      );
    });

    const result = await pool.query(
      `INSERT INTO Students (nom, prenom, email)
      VALUES ${values.join(", ")}
      RETURNING *`,
      params
    );

    return result.rows;
  },

  async update(id: number, data: StudentInput): Promise<Student | null> {
    const { nom, prenom, email } = data;
    const result = await pool.query(
      "UPDATE Students SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING *",
      [nom, prenom, email, id]
    );
    return result.rows[0] || null;
  },

  async patch(id: number, data: Partial<StudentInput>): Promise<Student | null> {
    const existing = await StudentRepository.findById(id);
    if (!existing) return null;

    const nom = data.nom ?? existing.nom;
    const prenom = data.prenom ?? existing.prenom;
    const email = data.email ?? existing.email;

    const result = await pool.query(
      "UPDATE Students SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING *",
      [nom, prenom, email, id]
    );
    return result.rows[0];
  },

  async remove(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM Students WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
