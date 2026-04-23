import { Router } from "express";
import {
    createArtifact,
    getArtifactById,
    getArtifacts,
    removeArtifact,
    updateArtifactById,
} from "../controllers/artifact.controller";

const router = Router();

router.get("/", getArtifacts);
router.post("/", createArtifact);
router.get("/:id", getArtifactById);
router.patch("/:id", updateArtifactById);
router.delete("/:id", removeArtifact);

export default router;
