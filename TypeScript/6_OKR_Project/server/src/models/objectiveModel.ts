import { model, Schema } from "mongoose"

const objectiveSchema = new Schema({
    objDescription: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
})

export default model('Objective', objectiveSchema)