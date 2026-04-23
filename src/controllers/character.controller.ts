import { Request, Response } from "express";
import {
    createCharacterService,
    deleteCharacter,
    getAllCharacters,
} from "../services/character.service";
import { asyncHandler } from "../utils/async-handler";

export const getCharacters = asyncHandler(async (_req: Request, res: Response) => {
    const characters = await getAllCharacters();
    res.status(200).json(characters);
});

export const createCharacter = asyncHandler(async (req: Request, res: Response) => {
    const character = await createCharacterService(req.body);
    res.status(201).json(character);
});

export const removeCharacter = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const deletedCharacter = await deleteCharacter(id);
    res.status(200).json(deletedCharacter);
});
