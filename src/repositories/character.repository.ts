import { CharacterModel } from "../models/character.model";

export const getCharacters = async () => {
    return CharacterModel.find().populate("bestFriend");
};

export const getCharacterById = async (id: string) => {
    return CharacterModel.findById(id).populate("bestFriend");
};

export const createCharacter = async (data: Record<string, unknown>) => {
    return new CharacterModel(data).save();
};

export const updateCharacterById = async (id: string, data: Record<string, unknown>) => {
    return CharacterModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).populate("bestFriend");
};

export const deleteCharacterById = async (id: string) => {
    return CharacterModel.findByIdAndDelete(id);
};
