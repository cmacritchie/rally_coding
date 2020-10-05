"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResult = exports.patchResult = exports.getResultById = exports.getResult = exports.createResult = void 0;
const resultModel_1 = __importDefault(require("../models/resultModel"));
exports.createResult = async (req, res) => {
    const result = new resultModel_1.default({
        ...req.body
    });
    try {
        await result.save();
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send(e);
    }
};
exports.getResult = async (req, res) => {
    try {
        const result = await resultModel_1.default.find({});
        res.send(result);
    }
    catch (e) {
        res.status(500).send();
    }
};
exports.getResultById = async (req, res) => {
    const _id = req.params.id;
    try {
        const result = await resultModel_1.default.findById(_id);
        if (!result) {
            return res.status(404).send();
        }
        res.send(result);
    }
    catch (e) {
        res.status(500).send();
    }
};
exports.patchResult = async (req, res) => {
    const _id = req.params.id;
    try {
        const result = await resultModel_1.default.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).send();
        }
        res.send(result);
    }
    catch (e) {
        res.status(400).send(e);
    }
};
exports.deleteResult = async (req, res) => {
    try {
        const result = await resultModel_1.default.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).send();
        }
        res.send(result);
    }
    catch (e) {
        res.status(500).send();
    }
};
