"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('./db/mongoose');
const body_parser_1 = require("body-parser");
//routes
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const objectiveRouter_1 = __importDefault(require("./routers/objectiveRouter"));
const resultRouter_1 = __importDefault(require("./routers/resultRouter"));
// const programmingRouter = require('./routers/programmingRouter')
// const sleepRouter = require('./routers/sleepRouter')
// const userRouter = require('./routers/userRouter')
// const weightRouter = require('./routers/weightRouter')
const app = express_1.default();
const port = process.env.PORT || 5000;
app.use(body_parser_1.json());
app.use(userRouter_1.default);
app.use(objectiveRouter_1.default);
app.use(resultRouter_1.default);
// app.use(exerciseRouter)
// app.use(programmingRouter)
// app.use(sleepRouter)
// app.use(userRouter)
// app.use(weightRouter)
app.listen(port, () => {
    console.log('Server is up on port, ', port);
});
