const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')
const Library = require('../models/library')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql



const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        pages: { type: GraphQLInt },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorID)
            }
        },
        libraries: {
            type: new GraphQLList(LibraryType),
            async resolve(parent, args) {
                const bookLibraries = await Book.findById(parent.id).populate('libraries').exec()
                return bookLibraries.libraries
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        age: { type: GraphQLString },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorID: parent.id})
            }
        }
    })
})

const LibraryType = new GraphQLObjectType({
    name: 'Library',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                const libraryWBooks =  await Library.findById(parent.id).populate('books').exec()
                return libraryWBooks.books
            }
        }
    })
})

//RootQuery describes how users can use the graph and grab data.
//E.g. get all authors, get all books, get a particular book or get a particular author

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parents, args) {
                return Book.find({})
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        },
        libraries: {
            type: new GraphQLList(LibraryType),
            resolve(parent, args) {
                return Library.find({})
            },
        },
        library: {
            type: LibraryType,
            args: { id: { type: GraphQLID }},
            resolve(parent, { id }) {
                return Library.findById(id)
            }
        }
    }
})

//can also add delete and edit I guess
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                //GraphQLNonNull make these fields required
                name: { type: new GraphQLNonNull(GraphQLString)},
                age: { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save();
            }
        },
        deleteAuthor: {
            type: AuthorType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, { id }) {
                return Author.findByIdAndDelete(id)
            }
        },
        editAuthor: {
            type: AuthorType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString)},
                age: { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, { id, ...author }) {
                return Author.findByIdAndUpdate(id, author, { new: true, runValidators: true})
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                pages: { type: new GraphQLNonNull(GraphQLInt)},
                authorID: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    pages: args.pages,
                    authorID: args.authorID
                })
                return book.save()
            }
        },
        deleteBook: {
            type: BookType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve( parentValue, { id }) {
                return Book.findByIdAndDelete(id)
            }
        },
        addLibrary: {
            type: LibraryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                address: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, {name, address}) {
                let library = new Library({
                    name, 
                    address
                })
                return library.save()
            }
        },
        deleteLibrary: {
            type: LibraryType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, { id }) {
                return Library.findByIdAndDelete(id)
            }
        },
        addBookToLibrary: {
            type: LibraryType,
            args: {
                bookId: { type: new GraphQLNonNull(GraphQLID)},
                libId: { type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, { bookId, libId }) {
                await Book.findByIdAndUpdate(bookId, { $push: { libraries: libId }});
                return await Library.findByIdAndUpdate(libId, { $push: { books: bookId }}, { returnOriginal: false });
            }
        },
        removeBookFromLibrary: {
            type: LibraryType,
            args: {
                bookId: { type: new GraphQLNonNull(GraphQLID)},
                libId: { type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, { bookId, libId }) {
                await Book.findByIdAndUpdate(bookId, { $pull: { libraries: libId }});
                return await Library.findByIdAndUpdate(libId, { $pull: { books: bookId }}, { returnOriginal: false });
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})