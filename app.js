const PORT = 3000;
const express = require("express");

const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require('./schema/schema');

// Initialize GraphQL for express
app.use("/graphql", graphqlHTTP({
    schema
}));

app.listen(PORT, () => console.log(`App started on port : ${PORT}`));
