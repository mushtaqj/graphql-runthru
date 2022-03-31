const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const _ = require("lodash");
const Author = require("../models/author");
const Book = require("../models/book");

//Dummy data
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, _args) => {
        const { authorId } = parent;

        return Author.findById(authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, _args) => {
        const { id } = parent;

        return Book.find({ authorId: id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => {
        const { id } = args;
        return _.find(books, { id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => {
        const { id } = args;

        return Author.findById(id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (_parent, _args) => Book.find(),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (_parent, _args) => Author.find(),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "mutations",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_parent, args) => {
        const { name, age } = args;
        const author = new Author({
          name,
          age,
        });

        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLID },
      },
      resolve: (_parent, args) => {
        const { name, genre, authorId } = args;
        const book = new Book({
          name,
          genre,
          authorId,
        });

        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
