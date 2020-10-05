"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const resultSchema = new mongoose_1.Schema({
    resultDescription: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    objectiveId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Objective'
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Result', resultSchema);
