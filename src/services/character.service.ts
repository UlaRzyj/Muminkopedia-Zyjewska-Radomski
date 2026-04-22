import {createCharacter, getCharacters} from "../repositories/character.repository";
import {ArtifactModel} from "../models/artifact.model";
import {CharacterModel} from "../models/character.model";

export const getAllCharacters = () => {
    return getCharacters();
}

export const createCharacterService = (data: any) => {
    if(!data.name || !data.destription || !data.species || data.isHibernating === undefined) {
        throw new Error("Brakuje wymaganych danych");
    }

    return createCharacter(data);
}

export const deleteCharacter = async (id: string) => {
    await ArtifactModel.updateMany(
        {owner: id},
        {owner: null}
    );

    return CharacterModel.findByIdAndDelete(id);
}