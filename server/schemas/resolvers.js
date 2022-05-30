//IMPORT
const { User, Book } = require('../models');

const resolvers = {
    Query: {
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
        },
    }
};

module.exports = resolvers;