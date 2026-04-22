import {createCharacter, getCharacters} from "../repositories/character.repository";

export const getAllCharacters = () => {
    return getCharacters();
}

export const createCharacterService = (data: any) => {
    if(!data.name || !data.destription || !data.species || data.isHibernating === undefined) {
        throw new Error("Brakuje wymaganych danych");
    }

    return createCharacter(data);
}