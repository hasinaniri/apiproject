import { StudentRepository } from "../repository/StudentRepository";
import { AppError } from "../types/AppError";
import { Student,StudentInput } from "../model/Student";
export const StudentService = {
  async getAll() {
    return await StudentRepository.findAll();
  },

  async getById(id: number) {
    const Student = await StudentRepository.findById(id);

    if (!Student) {
      throw new AppError("Student non trouve", 404);
    }

    return Student;
  },

  async create(data: StudentInput[]): Promise<Student[]> {
  if (!Array.isArray(data) || data.length === 0) {
    throw new AppError(
      "La liste des étudiants est obligatoire",
      400
    );
  }

  for (const Student of data) {
    if (!Student.nom || !Student.prenom || !Student.email) {
      throw new AppError(
        "Les champs nom, prenom et email sont obligatoires",
        400
      );
    }
  }

  return await StudentRepository.create(data);
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

    const updated = await StudentRepository.update(id, {
      nom,
      prenom,
      email,
    });

    if (!updated) {
      throw new AppError("Student non trouve", 404);
    }

    return updated;
  },

  async patch(id: number, data: Partial<{
    nom: string;
    prenom: string;
    email: string;
  }>) {
    const updated = await StudentRepository.patch(id, data);

    if (!updated) {
      throw new AppError("Student non trouve", 404);
    }

    return updated;
  },

  async remove(id: number) {
    const deleted = await StudentRepository.remove(id);

    if (!deleted) {
      throw new AppError("Student non trouve", 404);
    }

    return deleted;
  },
};