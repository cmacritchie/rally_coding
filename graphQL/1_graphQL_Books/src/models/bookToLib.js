const mongoose = require('mongoose')
const Book = require('./book')
const Library = require('./library')
const { Schema, model } = mongoose


//instead of using this we could use mongoose populate...
const bookToLibSchema = new Schema({
    bookId: {
        type: String,
        required:true
    },
    libId: {
        type: String,
        required:true
    },
})

module.exports = model('BookToLib', bookToLibSchema)