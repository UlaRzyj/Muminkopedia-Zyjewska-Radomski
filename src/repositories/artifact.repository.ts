import { ArtifactModel } from "../models/artifact.model";

export const getArtifacts = async () => {
    return ArtifactModel.find().populate("owner");
};

export const createArtifact = async (data: Record<string, unknown>) => {
    return new ArtifactModel(data).save();
};
