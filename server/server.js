//IMPORT
const express = require('express');
//APPOLO IMPORT
const { ApolloServer } = require('apollo-server-express');
//IMPORT TYPEDEFS AND RESOLVERS
const { typeDefs, resolvers } = require('./schemas');
//IMPORT MIDDELWARE FOR JWT
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

//BELOW ARE NOT FOUND IN WORKING APOLLO SERVER FILE
// const path = require('path');
// const routes = require('./routes');

const PORT = process.env.PORT || 3001;
//NEW APOLLO SERVER
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //ADD CONTEXT AS AUTHMIDDLEWARE FOR JWT
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//NEW INSTANCE OF AN APOLLO SERVER W GRAPHQL CHEMA
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //MIDDLEWARE
  server.applyMiddleware({ app })
};


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//NA FOR NEW MIDDLEWARE?
// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    //TESTING GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });

});

//CALL ASYNC TO START THE SERVER
startApolloServer(typeDefs, resolvers);