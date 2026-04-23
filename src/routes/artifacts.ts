import { Router } from "express";
import {
    createArtifact,
    getArtifacts,
} from "../controllers/artifact.controller";

const router = Router();

router.get("/", getArtifacts);
router.post("/", createArtifact);

export default router;
