"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObjective = exports.patchObjective = exports.getObjectiveById = exports.getObjectives = exports.createObjective = void 0;
const objectiveModel_1 = __importDefault(require("../models/objectiveModel"));
exports.createObjective = async (req, res) => {
    const objective = new objectiveModel_1.default({
        ...req.body
    });
    try {
        await objective.save();
        res.status(201).send(objective);
    }
    catch (e) {
        res.status(400).send(e);
    }
};
exports.getObjectives = async (req, res) => {
    try {
        const objective = await objectiveModel_1.default.find({});
        res.send(objective);
    }
    catch (e) {
        res.status(500).send();
    }
};
exports.getObjectiveById = async (req, res) => {
    const _id = req.params.id;
    try {
        const objective = await objectiveModel_1.default.findById(_id);
        if (!objective) {
            return res.status(404).send();
        }
        res.send(objective);
    }
    catch (e) {
        res.status(500).send();
    }
};
exports.patchObjective = async (req, res) => {
    const _id = req.params.id;
    try {
        const objective = await objectiveModel_1.default.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!objective) {
            return res.status(404).send();
        }
        res.send(objective);
    }
    catch (e) {
        res.status(400).send(e);
    }
};
exports.deleteObjective = async (req, res) => {
    try {
        const objective = await objectiveModel_1.default.findByIdAndDelete(req.params.id);
        if (!objective) {
            res.status(404).send();
        }
        res.send(objective);
    }
    catch (e) {
        res.status(500).send();
    }
};
