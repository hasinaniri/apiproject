import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt";
import { AppError } from "../model/AppError";
import { UserRepository } from "../repository/UserRepository";

export const AuthService = {
  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email ou mot de passe incorrect", 401);
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new AppError("Email ou mot de passe incorrect", 401);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      token,
    };
  },
};