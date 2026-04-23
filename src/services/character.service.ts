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
    destription?: string;
    species?: string;
    isHibernating?: boolean;
    bestFriend?: string;
};

export const getAllCharacters = async () => {
    return await getCharacters();
};

export const createCharacterService = async (data: CreateCharacterInput) => {
    const name = data.name?.trim();
    const description = data.description?.trim() || data.destription?.trim();
    const species = data.species?.trim();

    if (!name || !description || !species || data.isHibernating === undefined) {
        throw new Error("Brakuje wymaganych danych postaci");
    }

    if (!["Muminek", "Miukk", "Paszczak"].includes(species)) {
        throw new Error("Niepoprawny gatunek postaci");
    }

    if (data.bestFriend) {
        const bestFriend = await getCharacterById(data.bestFriend);

        if (!bestFriend) {
            throw new Error("Podany najlepszy przyjaciel nie istnieje");
        }
    }

    return await createCharacter({
        name,
        destription: description,
        species,
        isHibernating: data.isHibernating!,
        bestFriend: data.bestFriend,
    });
};

export const deleteCharacter = async (id: string) => {
    const character = await getCharacterById(id);

    if (!character) {
        throw new Error("Postać nie istnieje");
    }

    await deleteArtifactsByOwner(id);

    return await deleteCharacterById(id);
};
