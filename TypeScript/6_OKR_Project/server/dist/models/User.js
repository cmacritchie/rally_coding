"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true
});
exports.default = mongoose_1.model('User', userSchema);
