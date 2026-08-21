import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AuthService } from "../services/AuthService";

export const AuthController = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await AuthService.register(req.body);

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AuthService.login(req.body);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};