import express, { Application, Request, Response } from "express";
import etudiantRoutes from "./routes/StudentRoute";
import AuthRoute from "./routes/AuthRoute";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import { authMiddleware } from "./middlewares/authMiddleware";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

app.use("/auth", AuthRoute);

app.use("/etudiants", authMiddleware, etudiantRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
