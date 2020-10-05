"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resultController_1 = require("../controllers/resultController");
const router = express_1.Router();
router.post('/api/result', resultController_1.createResult);
router.get('/api/result', resultController_1.getResult);
router.get('/api/result/:id', resultController_1.getResultById);
router.patch('/api/result/:id', resultController_1.patchResult);
router.delete('/api/result/:id', resultController_1.deleteResult);
exports.default = router;
