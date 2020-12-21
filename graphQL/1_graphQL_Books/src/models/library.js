const mongoose = require('mongoose')
const { Schema } = mongoose

const librarySchema = new Schema({
    name: String,
    address: String,
    books: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
})

module.exports = mongoose.model('Library', librarySchema)