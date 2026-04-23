import { Request, Response } from "express";
import {
    createArtifactService,
    deleteArtifact,
    getArtifactDetails,
    getAllArtifacts,
    updateArtifact,
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

export const getArtifactById = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const artifact = await getArtifactDetails(req.params.id);
    res.status(200).json(artifact);
});

export const updateArtifactById = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const artifact = await updateArtifact(req.params.id, req.body);
    res.status(200).json(artifact);
});

export const removeArtifact = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const artifact = await deleteArtifact(req.params.id);
    res.status(200).json(artifact);
});
