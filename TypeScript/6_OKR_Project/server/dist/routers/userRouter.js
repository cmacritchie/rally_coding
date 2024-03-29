"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = express_1.Router();
router.post('/api/user', userController_1.createUser);
router.get('/api/user', userController_1.getUsers);
router.get('/api/user/:id', userController_1.getUserById);
router.patch('/api/user/:id', userController_1.patchUser);
router.delete('/api/user/:id', userController_1.deleteUser);
exports.default = router;
