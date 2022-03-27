const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        const { id } = args;
        // code to get data from a source
      },
    },
  },
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({}),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
