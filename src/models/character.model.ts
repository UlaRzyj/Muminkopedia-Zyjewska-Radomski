import {Schema, model} from "mongoose";

const characterSchema = new Schema({
    name: {type: String, required: true},
    destription: {type: String, required: true},
    species: {type: String, required: true, enum: ["Muminek", "Miukk", "Paszczak"]},
    isHibernating: {type: Boolean, required: true},
    bestFriend: {
        type: Schema.Types.ObjectId,
        ref: "Character"
    }
})

export const CharacterModel = model("Character", characterSchema)