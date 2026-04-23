import { ArtifactModel } from "../models/artifact.model";

export const getArtifacts = async () => {
    return ArtifactModel.find().populate("owner");
};

export const createArtifact = async (data: Record<string, unknown>) => {
    return new ArtifactModel(data).save();
};

export const deleteArtifactsByOwner = async (ownerId: string) => {
    return ArtifactModel.deleteMany({ owner: ownerId });
};
