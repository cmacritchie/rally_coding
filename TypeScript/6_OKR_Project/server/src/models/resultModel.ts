import { model, Schema } from "mongoose"

const resultSchema = new Schema({
    resultDescription: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    objectiveId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Objective'
    }
},
{
    timestamps: true
})

export default model('Result', resultSchema)