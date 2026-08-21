import { Request, Response, NextFunction } from "express";
import { StudentRepository } from "../repository/StudentRepository";
import { AppError } from "../types/AppError";
import { StudentService } from "../services/StudentService";
export const StudentController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const Students = await StudentRepository.findAll();
      res.status(200).json(Students);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const Student = await StudentRepository.findById(id);
      if (!Student) {
        throw new AppError("Student non trouve", 404);
      }
      res.status(200).json(Student);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
  try {
    const nouveaux = await StudentService.create(req.body);

    res.status(201).json(nouveaux);
  } catch (err) {
    next(err);
  }
},

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { nom, prenom, email } = req.body;
      if (!nom || !prenom || !email) {
        throw new AppError("Les champs nom, prenom et email sont obligatoires pour un PUT", 400);
      }
      const updated = await StudentRepository.update(id, { nom, prenom, email });
      if (!updated) {
        throw new AppError("Student non trouve", 404);
      }
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  },

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const updated = await StudentRepository.patch(id, req.body);

      if (!updated) {
        throw new AppError("Student non trouve", 404);
      }
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const deleted = await StudentRepository.remove(id);
      
      if (!deleted) {
        throw new AppError("Student non trouve", 404);
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
