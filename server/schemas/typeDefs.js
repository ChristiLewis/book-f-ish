//IMPORT GQL FUNCTION
const { gql } = require('apollo-server-express');

//CREATE
const typeDefs = gql`

   type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(username: String): [Book]
        book(_id: ID!): Book
    }

    type Mutation {
        login(
            email: String!, 
            password: String!
        ): Auth
        
        addUser(
            username: String!, 
            email: String!, 
            password: String!
        ): Auth

        saveBook(
            authors: [Author],
            description: String!,
            title: String!,
            bookId: ID!,
            image: String,
            link: String
        ): *
    }

    type removeBook {
        bookId: User
    }

    type User {
        _id: ID
        username: String
        email: String
        BookCount: Int
        savedbooks: [Book]
    }   

    type Book {
        bookId: ID!
        authors: [Author]
        description: String
        title: String
        image:
        link:  
    }
    
    type Auth {
        token: ID!
        user: User
    }

    <<<<<< HEAD * token
    *
    =======

`;

//EXPORT TYPEDEFS
module.exports = typeDefs;