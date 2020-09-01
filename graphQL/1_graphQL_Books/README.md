First Graphql Project using express, Node, Mongodb


npm 
graphql-playground-middleware-express
graphiql
graphql-tag
graphql-tools
https://medium.com/@utkarshprakash/setting-up-graphql-server-with-nodejs-express-and-mongodb-d72fba13216
https://www.apollographql.com/docs/react/

Next: Add Mutations (CRUD OPERATIONS)

then add front end

start project:
-npm run dev
- http://localhost:4000/graphql



e.g. fetches
{
	authors{
    id
    name 
  }
}

{
    books {
        id,
        name, 
        pages, 
        author
    }
}

mutation {
  addBook(name: "Brave New Soda", pages:363, authorID: "5f2957fcf6d12c5f74de88bd") {
    name
    pages
    author{
      name
    }
  }
}