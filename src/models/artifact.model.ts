import {Schema, model} from 'mongoose';

const artifactSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    power: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Character"
    }
})

export const ArtifactModel = model("Artifact", artifactSchema);