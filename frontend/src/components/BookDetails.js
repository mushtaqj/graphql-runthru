import { useQuery } from "@apollo/client";
import React from "react";
import { getBookQuery } from "../queries";

const BookDetails = () => {

  useQuery()
  return (
    <div id="book-details">
      <p>Output book details here</p>
    </div>
  );
};

export default BookDetails;
