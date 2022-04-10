import { useQuery } from "@apollo/client";
import React from "react";
import { allBooksQuery } from "../queries";

const BookList = () => {
  const { loading, error, data } = useQuery(allBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { books } = data;

  return (
    <div>
      <ul id="book-list">
        {books.map((book) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
