import express from 'express';
require('./db/mongoose')
import { json } from 'body-parser';

//routes
import userRouter from './routers/userRouter'
import objectiveRouter from './routers/objectiveRouter'
import resultRouter from './routers/resultRouter'
// const programmingRouter = require('./routers/programmingRouter')
// const sleepRouter = require('./routers/sleepRouter')
// const userRouter = require('./routers/userRouter')
// const weightRouter = require('./routers/weightRouter')



const app = express()
const port = process.env.PORT || 5000

app.use(json())
app.use(userRouter)
app.use(objectiveRouter)
app.use(resultRouter)
// app.use(exerciseRouter)
// app.use(programmingRouter)
// app.use(sleepRouter)
// app.use(userRouter)
// app.use(weightRouter)


app.listen(port, () =>{
    console.log('Server is up on port, ', port)
})