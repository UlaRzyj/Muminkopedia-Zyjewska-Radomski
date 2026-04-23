import { Router } from "express";
import {
    createCharacter,
    getCharacters,
    removeCharacter,
} from "../controllers/character.controller";

const router = Router();

router.get("/", getCharacters);
router.post("/", createCharacter);
router.delete("/:id", removeCharacter);

export default router;
