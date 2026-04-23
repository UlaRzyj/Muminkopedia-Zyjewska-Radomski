import { HttpError } from "../errors/http-error";
import {
    createArtifact,
    deleteArtifactById,
    getArtifactById,
    getArtifacts,
    updateArtifactById,
} from "../repositories/artifact.repository";
import { getCharacterById } from "../repositories/character.repository";
import { validateObjectId } from "../utils/validate-object-id";

type CreateArtifactInput = {
    name?: string;
    description?: string;
    power?: string;
    owner?: string;
};

type UpdateArtifactInput = Partial<CreateArtifactInput>;

const normalizeArtifactData = (data: CreateArtifactInput) => {
    const name = data.name?.trim();
    const description = data.description?.trim();
    const power = data.power?.trim();
    const owner = data.owner?.trim();

    if (!name || !description || !owner) {
        throw new HttpError(400, "Brakuje wymaganych danych artefaktu");
    }

    validateObjectId(owner, "id wlasciciela");

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

export const getArtifactDetails = async (id: string) => {
    validateObjectId(id);

    const artifact = await getArtifactById(id);

    if (!artifact) {
        throw new HttpError(404, "Artefakt nie istnieje");
    }

    return artifact;
};

export const createArtifactService = async (data: CreateArtifactInput) => {
    const normalizedData = normalizeArtifactData(data);
    const owner = await getCharacterById(normalizedData.owner);

    if (!owner) {
        throw new HttpError(404, "Podany wlasciciel nie istnieje");
    }

    return await createArtifact(normalizedData);
};

export const updateArtifact = async (id: string, data: UpdateArtifactInput) => {
    validateObjectId(id);

    const artifact = await getArtifactById(id);

    if (!artifact) {
        throw new HttpError(404, "Artefakt nie istnieje");
    }

    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) {
        const name = data.name.trim();

        if (!name) {
            throw new HttpError(400, "Nazwa artefaktu nie moze byc pusta");
        }

        updateData.name = name;
    }

    if (data.description !== undefined) {
        const description = data.description.trim();

        if (!description) {
            throw new HttpError(400, "Opis artefaktu nie moze byc pusty");
        }

        updateData.description = description;
    }

    if (data.power !== undefined) {
        updateData.power = data.power.trim() || undefined;
    }

    if (data.owner !== undefined) {
        const ownerId = data.owner.trim();

        if (!ownerId) {
            throw new HttpError(400, "Wlasciciel artefaktu jest wymagany");
        }

        validateObjectId(ownerId, "id wlasciciela");

        const owner = await getCharacterById(ownerId);

        if (!owner) {
            throw new HttpError(404, "Podany wlasciciel nie istnieje");
        }

        updateData.owner = ownerId;
    }

    if (Object.keys(updateData).length === 0) {
        throw new HttpError(400, "Brak danych do aktualizacji artefaktu");
    }

    const updatedArtifact = await updateArtifactById(id, updateData);

    if (!updatedArtifact) {
        throw new HttpError(404, "Artefakt nie istnieje");
    }

    return updatedArtifact;
};

export const deleteArtifact = async (id: string) => {
    validateObjectId(id);

    const artifact = await getArtifactById(id);

    if (!artifact) {
        throw new HttpError(404, "Artefakt nie istnieje");
    }

    const deletedArtifact = await deleteArtifactById(id);

    if (!deletedArtifact) {
        throw new HttpError(404, "Artefakt nie istnieje");
    }

    return deletedArtifact;
};
