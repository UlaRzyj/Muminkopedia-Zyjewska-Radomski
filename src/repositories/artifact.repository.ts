import { ArtifactModel } from "../models/artifact.model";

export const getArtifacts = async () => {
    return ArtifactModel.find().populate("owner");
};

export const getArtifactById = async (id: string) => {
    return ArtifactModel.findById(id).populate("owner");
};

export const createArtifact = async (data: Record<string, unknown>) => {
    return new ArtifactModel(data).save();
};

export const updateArtifactById = async (id: string, data: Record<string, unknown>) => {
    return ArtifactModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).populate("owner");
};

export const deleteArtifactById = async (id: string) => {
    return ArtifactModel.findByIdAndDelete(id).populate("owner");
};

export const deleteArtifactsByOwner = async (ownerId: string) => {
    return ArtifactModel.deleteMany({ owner: ownerId });
};
