import {Schema, model} from 'mongoose';

const artifactSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    power: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Character",
        required: true
    }
})

export const ArtifactModel = model("Artifact", artifactSchema);