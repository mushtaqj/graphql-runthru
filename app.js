const PORT = 3000;
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

const dbUrl = `mongodb+srv://mushtaqj:ushallpass@noderunthru.fnrjzc.mongodb.net/graphql-runthru?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, () => {
  console.log("connected db");

  // Initialize GraphQL for express
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(PORT, () => console.log(`App started on port : ${PORT}`));
});
