import { Request, Response, NextFunction } from "express";
import { etudiantRepository } from "../repository/EtudiantRepository";
import { AppError } from "../types/AppError";
import { EtudiantService } from "../services/EtudiantService";
export const EtudiantController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const etudiants = await etudiantRepository.findAll();
      res.status(200).json(etudiants);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const etudiant = await etudiantRepository.findById(id);
      if (!etudiant) {
        throw new AppError("Etudiant non trouve", 404);
      }
      res.status(200).json(etudiant);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
  try {
    const nouveaux = await EtudiantService.create(req.body);

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
      const updated = await etudiantRepository.update(id, { nom, prenom, email });
      if (!updated) {
        throw new AppError("Etudiant non trouve", 404);
      }
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  },

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const updated = await etudiantRepository.patch(id, req.body);
      if (!updated) {
        throw new AppError("Etudiant non trouve", 404);
      }
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const deleted = await etudiantRepository.remove(id);
      if (!deleted) {
        throw new AppError("Etudiant non trouve", 404);
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
