import { Router } from "express";
import { EtudiantController } from "../controllers/etudiant.controller";

const router = Router();

router.get("/", EtudiantController.getAll);
router.get("/:id", EtudiantController.getById);
router.post("/", EtudiantController.create);
router.put("/:id", EtudiantController.update);
router.patch("/:id", EtudiantController.patch);
router.delete("/:id", EtudiantController.remove);

export default router;
