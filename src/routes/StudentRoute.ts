import { Router } from "express";
import { StudentController } from "../controllers/StudentController";

const router = Router();

router.get("/", StudentController.getAll);
router.get("/:id", StudentController.getById);
router.post("/", StudentController.create);
router.put("/:id", StudentController.update);
router.patch("/:id", StudentController.patch);
router.delete("/:id", StudentController.remove);

export default router;
