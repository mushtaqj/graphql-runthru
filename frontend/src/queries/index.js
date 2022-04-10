import { gql } from "@apollo/client";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const allBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query ($id: String) {
    book(id: $id) {
      name
      id
      genre
      author {
        name
        id
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export { getAuthorsQuery, allBooksQuery, addBookMutation, getBookQuery };
