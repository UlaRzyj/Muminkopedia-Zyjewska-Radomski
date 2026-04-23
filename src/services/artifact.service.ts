import { createArtifact, getArtifacts } from "../repositories/artifact.repository";
import { getCharacterById } from "../repositories/character.repository";

type CreateArtifactInput = {
    name?: string;
    description?: string;
    power?: string;
    owner?: string;
};

const normalizeArtifactData = (data: CreateArtifactInput) => {
    const name = data.name?.trim();
    const description = data.description?.trim();
    const power = data.power?.trim();
    const owner = data.owner?.trim();

    if (!name || !description || !owner) {
        throw new Error("Brakuje wymaganych danych artefaktu");
    }

    return {
        name,
        description,
        power,
        owner,
    };
};

export const getAllArtifacts = async () => {
    return await getArtifacts();
};

export const createArtifactService = async (data: CreateArtifactInput) => {
    const normalizedData = normalizeArtifactData(data);
    const owner = await getCharacterById(normalizedData.owner);

    if (!owner) {
        throw new Error("Podany właściciel nie istnieje");
    }

    return await createArtifact(normalizedData);
};
