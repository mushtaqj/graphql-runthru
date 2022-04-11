import { useQuery } from "@apollo/client";
import React from "react";
import { getBookQuery } from "../queries";

const BookDetails = (props) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: props.bookId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div id="book-details">{renderBookInfo(data)}</div>;
};

const renderBookInfo = (data) => {
  const { book } = data;

  if (book) {
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All Books by this author</p>
        <ul className="other-books">
          {book.author.books.map((otherBook) => {
            return <li key={otherBook.id}>{otherBook.name}</li>;
          })}
        </ul>
      </div>
    );
  }

  return <h3>No Book Selected!!!</h3>;
};

export default BookDetails;
