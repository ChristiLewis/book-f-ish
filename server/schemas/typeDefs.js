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
        description: String, req
        googleBookId: String, req??????
        username: String
        reactionCount: Int
        authors: [Author]
        image: String
        link: String
        title: String, req
        
    }

    type Query {
        users: [User]
        user(username: String!): User
        books(username: String): [Book]
        book(_id: ID!): Book
        
    }

`;

//EXPORT TYPEDEFS
module.exports = typeDefs;