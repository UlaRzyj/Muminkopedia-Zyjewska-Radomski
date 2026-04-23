import { Request, Response } from "express";
import {
    createCharacterService,
    deleteCharacter,
    getAllCharacters,
} from "../services/character.service";

export const getCharacters = async (_req: Request, res: Response) => {
    try {
        const characters = await getAllCharacters();
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Blad podczas pobierania postaci",
        });
    }
};

export const createCharacter = async (req: Request, res: Response) => {
    try {
        const character = await createCharacterService(req.body);
        res.status(201).json(character);
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Blad podczas tworzenia postaci",
        });
    }
};

export const removeCharacter = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;

        const deletedCharacter = await deleteCharacter(id);
        res.status(200).json(deletedCharacter);
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Blad podczas usuwania postaci",
        });
    }
};
