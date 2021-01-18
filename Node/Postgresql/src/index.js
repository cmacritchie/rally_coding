const express = require('express')

//Databases
require('./db/postgresql')

//assoications
const entities = {
    users: require('./models/userModel.js'),
    blogPost: require('./models/blogModel')
}

entities.users.hasMany(entities.blogPost, { foreignKey: 'UserId' })
entities.blogPost.belongsTo(entities.users)

//routers
const userRouter = require('./routers/userRouter')
const blogRouter = require('./routers/blogRouter')

// //
const app = express()
const port = process.env.PORT || 5000

//using
app.use(express.json())
app.use(userRouter)
app.use(blogRouter)


app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})