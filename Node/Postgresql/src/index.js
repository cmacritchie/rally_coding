const express = require('express')

//Databases
require('./db/postgresql')

//routers
const userRouter = require('./routers/userRouter')
const todoRouter = require('./routers/todoRouter')
//
const app = express()
const port = process.env.PORT || 5000

//using
app.use(express.json())
app.use(userRouter)
app.use(todoRouter)


app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})