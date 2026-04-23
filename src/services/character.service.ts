import { ArtifactModel } from "../models/artifact.model";
import {
    createCharacter,
    deleteCharacterById,
    getCharacterById,
    getCharacters,
} from "../repositories/character.repository";

const ALLOWED_SPECIES = ["Muminek", "Miukk", "Paszczak"] as const;

type Species = (typeof ALLOWED_SPECIES)[number];

type CreateCharacterInput = {
    name?: string;
    description?: string;
    destription?: string;
    species?: string;
    isHibernating?: boolean;
    bestFriend?: string;
};

const normalizeCharacterData = (data: CreateCharacterInput) => {
    const name = data.name?.trim();
    const description = data.description?.trim() ?? data.destription?.trim();
    const species = data.species?.trim() as Species | undefined;

    if (!name || !description || !species || data.isHibernating === undefined) {
        throw new Error("Brakuje wymaganych danych postaci");
    }

    if (!ALLOWED_SPECIES.includes(species)) {
        throw new Error("Niepoprawny gatunek postaci");
    }

    return {
        name,
        destription: description,
        species,
        isHibernating: data.isHibernating,
        bestFriend: data.bestFriend,
    };
};

export const getAllCharacters = async () => {
    return await getCharacters();
};

export const createCharacterService = async (data: CreateCharacterInput) => {
    const normalizedData = normalizeCharacterData(data);

    if (normalizedData.bestFriend) {
        const bestFriend = await getCharacterById(normalizedData.bestFriend);

        if (!bestFriend) {
            throw new Error("Podany najlepszy przyjaciel nie istnieje");
        }
    }

    return await createCharacter(normalizedData);
};

export const deleteCharacter = async (id: string) => {
    const character = await getCharacterById(id);

    if (!character) {
        throw new Error("Postać nie istnieje");
    }

    await ArtifactModel.deleteMany({ owner: id });

    return await deleteCharacterById(id);
};
