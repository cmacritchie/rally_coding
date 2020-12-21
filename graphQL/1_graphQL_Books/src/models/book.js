const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
    name: String,
    pages: Number,
    authorID: String,
    libraries: [{
        type: Schema.Types.ObjectId,
        ref:'Library'
        }]

})

module.exports = mongoose.model('Book', bookSchema)