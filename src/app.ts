import express, { Application, Request, Response } from "express";
import etudiantRoutes from "./routes/etudiant.routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

app.use("/etudiants", etudiantRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
