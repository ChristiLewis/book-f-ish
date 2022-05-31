//IMPORT GQL FUNCTION
const { gql } = require('apollo-server-express');

//CREATE
const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }   

    type Book {
        _id: ID
        description: String!
        googleBookId: ID!
        username: String
        reactionCount: Int
        authors: [Author]
        image: String
        link: String
        title: String!
        
    }

    type Query {
        users: [User]
        user(username: String!): User
        books(username: String): [Book]
        book(_id: ID!): Book
        
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }

`;

//EXPORT TYPEDEFS
module.exports = typeDefs;