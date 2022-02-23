const express = require('express');
require('dotenv').config();
//import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
//import Apollo typeDefs and Resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  // create the Apollo Server and pass in our schema 
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // playground: true,
    // introspection: true,
    context: authMiddleware
  });
  await server.start();

  //integrate our express application as Apollo middleware
  server.applyMiddleware({ app });

  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize Apollo server
startServer()




app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  console.log('running in production');
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  console.log('running in development');
}


db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
