import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";
import { AppError } from "../types/AppError";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError("Token manquant", 401);
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      throw new AppError("Format du token invalide", 401);
    }

    const decoded = verifyToken(token);
    
    if (typeof decoded === "string") {
      throw new AppError("Token invalide", 401);
    }

    req.user = {
      id: String(decoded.id),
      email: String(decoded.email),
    };

    next();
  } catch (err) {
    next(
      err instanceof AppError
        ? err
        : new AppError("Token invalide ou expire", 401)
    );
  }
};