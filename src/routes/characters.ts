import { Router } from "express";
import {
    createCharacter,
    getCharacterById,
    getCharacters,
    removeCharacter,
    updateCharacterById,
} from "../controllers/character.controller";

const router = Router();

router.get("/", getCharacters);
router.post("/", createCharacter);
router.get("/:id", getCharacterById);
router.patch("/:id", updateCharacterById);
router.delete("/:id", removeCharacter);

export default router;
