import { etudiantRepository } from "../repository/EtudiantRepository";
import { AppError } from "../types/AppError";

export const EtudiantService = {
  async getAll() {
    return await etudiantRepository.findAll();
  },

  async getById(id: number) {
    const etudiant = await etudiantRepository.findById(id);

    if (!etudiant) {
      throw new AppError("Etudiant non trouve", 404);
    }

    return etudiant;
  },

  async create(data: {
    nom: string;
    prenom: string;
    email: string;
  }) {
    const { nom, prenom, email } = data;

    if (!nom || !prenom || !email) {
      throw new AppError(
        "Les champs nom, prenom et email sont obligatoires",
        400
      );
    }

    return await etudiantRepository.create({
      nom,
      prenom,
      email,
    });
  },

  async update(
    id: number,
    data: {
      nom: string;
      prenom: string;
      email: string;
    }
  ) {
    const { nom, prenom, email } = data;

    if (!nom || !prenom || !email) {
      throw new AppError(
        "Les champs nom, prenom et email sont obligatoires pour un PUT",
        400
      );
    }

    const updated = await etudiantRepository.update(id, {
      nom,
      prenom,
      email,
    });

    if (!updated) {
      throw new AppError("Etudiant non trouve", 404);
    }

    return updated;
  },

  async patch(id: number, data: Partial<{
    nom: string;
    prenom: string;
    email: string;
  }>) {
    const updated = await etudiantRepository.patch(id, data);

    if (!updated) {
      throw new AppError("Etudiant non trouve", 404);
    }

    return updated;
  },

  async remove(id: number) {
    const deleted = await etudiantRepository.remove(id);

    if (!deleted) {
      throw new AppError("Etudiant non trouve", 404);
    }

    return deleted;
  },
};