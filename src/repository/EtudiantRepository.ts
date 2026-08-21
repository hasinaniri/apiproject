import { pool } from "../config/db";
import { Etudiant, EtudiantInput } from "../model/Etudiant";

export const etudiantRepository = {
  async findAll(): Promise<Etudiant[]> {
    const result = await pool.query("SELECT * FROM etudiants ORDER BY id");
    return result.rows;
  },

  async findById(id: number): Promise<Etudiant | null> {
    const result = await pool.query("SELECT * FROM etudiants WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  async create(data: EtudiantInput[]): Promise<Etudiant[]> {
    const values: string[] = [];
    const params: any[] = [];

    data.forEach((etudiant, index) => {
      const offset = index * 3;

      values.push(`($${offset + 1}, $${offset + 2}, $${offset + 3})`);

      params.push(
        etudiant.nom,
        etudiant.prenom,
        etudiant.email
      );
    });

    const result = await pool.query(
      `INSERT INTO etudiants (nom, prenom, email)
      VALUES ${values.join(", ")}
      RETURNING *`,
      params
    );

    return result.rows;
  },

  async update(id: number, data: EtudiantInput): Promise<Etudiant | null> {
    const { nom, prenom, email } = data;
    const result = await pool.query(
      "UPDATE etudiants SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING *",
      [nom, prenom, email, id]
    );
    return result.rows[0] || null;
  },

  async patch(id: number, data: Partial<EtudiantInput>): Promise<Etudiant | null> {
    const existing = await etudiantRepository.findById(id);
    if (!existing) return null;

    const nom = data.nom ?? existing.nom;
    const prenom = data.prenom ?? existing.prenom;
    const email = data.email ?? existing.email;

    const result = await pool.query(
      "UPDATE etudiants SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING *",
      [nom, prenom, email, id]
    );
    return result.rows[0];
  },

  async remove(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM etudiants WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
