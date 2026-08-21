import express, { Application, Request, Response } from "express";
import cors from "cors";

import StudentRoutes from "./routes/StudentRoute";
import AuthRoute from "./routes/AuthRoute";

import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import { authMiddleware } from "./middlewares/authMiddleware";

const app: Application = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}))

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

app.use("/auth", AuthRoute);

app.use("/Students", authMiddleware, StudentRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
