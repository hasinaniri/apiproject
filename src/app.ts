import express, { Application, Request, Response } from "express";
import etudiantRoutes from "./routes/etudiant.routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

const app: Application = express();

app.use(express.json());

// Route de test
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

// Routes de la ressource etudiants
app.use("/etudiants", etudiantRoutes);

// 404 pour les routes inconnues
app.use(notFoundHandler);

// Gestion centralisee des erreurs (toujours en dernier)
app.use(errorHandler);

export default app;
