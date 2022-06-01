//IMPORT
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Book } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args) => {
            const userData = await User.findOne({})
                .select('-__v -password')
                .populate('books');

            return userData;
        },

        //ALL
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ createdAt: -1 });
        },

        //ONE BY ID
        book: async (parent, { _id }) => {
            return Book.findOne({ _id });
        },

        //ALL USERS
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('books');
        },

        //USER BY USERNAME
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('books');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        addBook: async (parent, args, context) => {
            if (context.user) {
                const thought = await Book.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { books: book._id } },
                    { new: true }
                );

                return book;
            }

            throw new AuthenticationError('You need to be logged in!');
        }

    }

};

module.exports = resolvers;



