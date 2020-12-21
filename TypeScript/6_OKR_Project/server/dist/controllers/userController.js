"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.patchUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
exports.createUser = async (req, res) => {
    console.log("Hello test");
    const user = new userModel_1.default({
        ...req.body
    });
    try {
        await user.save();
        res.status(201).send(user);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};
exports.getUsers = async (req, res) => {
    try {
        const users = await userModel_1.default.find({});
        res.send(users);
    }
    catch (e) {
        res.status(500).send();
    }
};
exports.getUserById = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await userModel_1.default.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }
    catch (e) {
        res.status(500).send();
    }
};
exports.patchUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await userModel_1.default.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }
    catch (e) {
        res.status(400).send(e);
    }
};
exports.deleteUser = async (req, res) => {
    console.log("delete", req.params.id);
    try {
        const user = await userModel_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send();
        }
        res.send(user);
    }
    catch (e) {
        res.status(500).send();
    }
};
