import {CharacterModel} from '../models/character.model';

export const getCharacters = () => {
    return CharacterModel.find();
};

export const createCharacter = (data: any) => {
    return new CharacterModel(data).save();
}