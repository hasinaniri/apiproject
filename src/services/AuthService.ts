import bcrypt from "bcrypt";
import { UserRepository } from "../repository/UserRepository";
import { UserInput } from "../model/User";
import { generateToken } from "../config/jwt";
import { AppError } from "../types/AppError";

export const AuthService = {
  async register(data: UserInput) {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError(
        "Email et mot de passe obligatoires",
        400
      );
    }

    const existingUser =
      await UserRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError(
        "Un utilisateur avec cet email existe deja",
        409
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserRepository.create(
      email,
      passwordHash
    );

    return {
      id: user.id,
      email: user.email,
    };
  },

  async login(data: UserInput) {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError(
        "Email et mot de passe obligatoires",
        400
      );
    }

    const user =
      await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        "Email ou mot de passe incorrect",
        401
      );
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordValid) {
      throw new AppError(
        "Email ou mot de passe incorrect",
        401
      );
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