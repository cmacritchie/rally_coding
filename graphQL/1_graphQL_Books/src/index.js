const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const mongoose = require('mongoose')

//database
const connectString = "mongodb://127.0.0.1:27017/library";
mongoose.connect(connectString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() =>console.log("MongoDB connected"))
        .catch(err => console.log("error connecting to mongodb", err))


//setGraphQL Schema
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

//Start Server
app.listen(4000, () => {
    console.log('listening port 4000')
})