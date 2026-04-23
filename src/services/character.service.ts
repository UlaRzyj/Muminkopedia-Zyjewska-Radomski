import { HttpError } from "../errors/http-error";
import { deleteArtifactsByOwner } from "../repositories/artifact.repository";
import {
    createCharacter,
    deleteCharacterById,
    getCharacterById,
    getCharacters,
    updateCharacterById,
} from "../repositories/character.repository";

type CreateCharacterInput = {
    name?: string;
    description?: string;
    species?: string;
    isHibernating?: boolean;
    bestFriend?: string;
};

type UpdateCharacterInput = Partial<CreateCharacterInput>;

const allowedSpecies = ["Muminek", "Miukk", "Paszczak"];

const validateBestFriend = async (bestFriendId?: string) => {
    if (!bestFriendId) {
        return;
    }

    const bestFriend = await getCharacterById(bestFriendId);

    if (!bestFriend) {
        throw new HttpError(404, "Podany najlepszy przyjaciel nie istnieje");
    }
};

export const getAllCharacters = async () => {
    return await getCharacters();
};

export const getCharacterDetails = async (id: string) => {
    const character = await getCharacterById(id);

    if (!character) {
        throw new HttpError(404, "Postac nie istnieje");
    }

    return character;
};

export const createCharacterService = async (data: CreateCharacterInput) => {
    const name = data.name?.trim();
    const description = data.description?.trim();
    const species = data.species?.trim();

    if (!name || !description || !species || data.isHibernating === undefined) {
        throw new HttpError(400, "Brakuje wymaganych danych postaci");
    }

    if (!allowedSpecies.includes(species)) {
        throw new HttpError(400, "Niepoprawny gatunek postaci");
    }

    await validateBestFriend(data.bestFriend);

    return await createCharacter({
        name,
        description,
        species,
        isHibernating: data.isHibernating,
        bestFriend: data.bestFriend,
    });
};

export const updateCharacter = async (id: string, data: UpdateCharacterInput) => {
    const character = await getCharacterById(id);

    if (!character) {
        throw new HttpError(404, "Postac nie istnieje");
    }

    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) {
        const name = data.name.trim();

        if (!name) {
            throw new HttpError(400, "Imie postaci nie moze byc puste");
        }

        updateData.name = name;
    }

    if (data.description !== undefined) {
        const description = data.description.trim();

        if (!description) {
            throw new HttpError(400, "Opis postaci nie moze byc pusty");
        }

        updateData.description = description;
    }

    if (data.species !== undefined) {
        const species = data.species.trim();

        if (!allowedSpecies.includes(species)) {
            throw new HttpError(400, "Niepoprawny gatunek postaci");
        }

        updateData.species = species;
    }

    if (data.isHibernating !== undefined) {
        updateData.isHibernating = data.isHibernating;
    }

    if (data.bestFriend !== undefined) {
        const bestFriend = data.bestFriend.trim();

        if (!bestFriend) {
            updateData.bestFriend = null;
        } else {
            await validateBestFriend(bestFriend);
            updateData.bestFriend = bestFriend;
        }
    }

    if (Object.keys(updateData).length === 0) {
        throw new HttpError(400, "Brak danych do aktualizacji postaci");
    }

    const updatedCharacter = await updateCharacterById(id, updateData);

    if (!updatedCharacter) {
        throw new HttpError(404, "Postac nie istnieje");
    }

    return updatedCharacter;
};

export const deleteCharacter = async (id: string) => {
    const character = await getCharacterById(id);

    if (!character) {
        throw new HttpError(404, "Postac nie istnieje");
    }

    await deleteArtifactsByOwner(id);

    return await deleteCharacterById(id);
};
