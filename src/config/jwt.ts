import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini");
}

export interface JwtPayload {
  id: number;
  email: string;
}

export const generateToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (
  token: string
): JwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Payload JWT invalide");
  }

  return {
    id: Number(decoded.id),
    email: String(decoded.email),
  };
};