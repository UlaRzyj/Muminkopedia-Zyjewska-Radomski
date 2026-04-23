import { Request, Response } from "express";
import {
    createArtifactService,
    getAllArtifacts,
} from "../services/artifact.service";
import { asyncHandler } from "../utils/async-handler";

export const getArtifacts = asyncHandler(async (_req: Request, res: Response) => {
    const artifacts = await getAllArtifacts();
    res.status(200).json(artifacts);
});

export const createArtifact = asyncHandler(async (req: Request, res: Response) => {
    const artifact = await createArtifactService(req.body);
    res.status(201).json(artifact);
});
