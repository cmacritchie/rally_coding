import { model, Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    age: {
        type: Number,
    },
    position: {
        type: String,
        enum: ['Developer', 'Manager', 'QA', 'HR']
    }
},
{
    timestamps: true
})

export default model('User', userSchema)