import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const getAuthorsQuery = gql`
  {
    authors {
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

const AddBook = (props) => {
  const [state, setState] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  const submitForm = async (e) => {
    e.preventDefault();
    addBook({ variables: { ...state } });
  };

  const mutateBook = (changedBookState) => {
    setState({ ...state, ...changedBookState });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { authors } = data;

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) => mutateBook({ name: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => mutateBook({ genre: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => mutateBook({ authorId: e.target.value })}>
          <option>Select author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
