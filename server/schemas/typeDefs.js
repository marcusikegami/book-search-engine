// import gql from apollo
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        title: String
    }
    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String!], description: String!, bookId: String!, image: String!, title: String!,): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;