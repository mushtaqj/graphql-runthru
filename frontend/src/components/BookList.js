import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { allBooksQuery } from "../queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [state, setState] = useState({
    selected: undefined,
  });
  const { loading, error, data } = useQuery(allBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { books } = data;

  return (
    <div>
      <ul id="book-list">
        {books.map((book) => (
          <li key={book.id} onClick={(e) => setState({ selected: book.id })}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={state.selected} />
    </div>
  );
};

export default BookList;
