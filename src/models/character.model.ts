import {Schema, model} from "mongoose";

const characterSchema = new Schema({
    name: {type: String, required: true},
    destription: String,
    species: String,
    isHibernating: Boolean,
    bestFriend: {
        type: Schema.Types.ObjectId,
        ref: "Character"
    }
})

export const CharacterModel = model("Character", characterSchema)