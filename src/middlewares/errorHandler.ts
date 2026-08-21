import { Request, Response, NextFunction } from "express";
import { AppError } from "../model/AppError";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Erreur interne du serveur";

  console.error(`[Erreur] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} introuvable`,
  });
}
