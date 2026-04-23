import { HttpError } from "../errors/http-error";
import { deleteArtifactsByOwner } from "../repositories/artifact.repository";
import {
    createCharacter,
    deleteCharacterById,
    getCharacterById,
    getCharacters,
} from "../repositories/character.repository";

type CreateCharacterInput = {
    name?: string;
    description?: string;
    species?: string;
    isHibernating?: boolean;
    bestFriend?: string;
};

export const getAllCharacters = async () => {
    return await getCharacters();
};

export const createCharacterService = async (data: CreateCharacterInput) => {
    const name = data.name?.trim();
    const description = data.description?.trim();
    const species = data.species?.trim();

    if (!name || !description || !species || data.isHibernating === undefined) {
        throw new HttpError(400, "Brakuje wymaganych danych postaci");
    }

    if (!["Muminek", "Miukk", "Paszczak"].includes(species)) {
        throw new HttpError(400, "Niepoprawny gatunek postaci");
    }

    if (data.bestFriend) {
        const bestFriend = await getCharacterById(data.bestFriend);

        if (!bestFriend) {
            throw new HttpError(404, "Podany najlepszy przyjaciel nie istnieje");
        }
    }

    return await createCharacter({
        name,
        description,
        species,
        isHibernating: data.isHibernating,
        bestFriend: data.bestFriend,
    });
};

export const deleteCharacter = async (id: string) => {
    const character = await getCharacterById(id);

    if (!character) {
        throw new HttpError(404, "Postac nie istnieje");
    }

    await deleteArtifactsByOwner(id);

    return await deleteCharacterById(id);
};
