const PORT = 3000;
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

const dbUrl =
  "mongodb+srv://mushtaqj:ushallpass@noderunthru.frjzc.mongodb.net/graphql-runthru?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Db");
    // listen for requests

    app.listen(PORT, () => console.log(`App started on port : ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to Db", err));

// Initialize GraphQL for express
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
