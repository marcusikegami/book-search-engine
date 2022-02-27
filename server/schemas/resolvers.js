const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me:  async (parent, args, context) => {
            if(context.user) {
                 const user = await User.findOne({ _id: context.user._id })
                 .select('-__v -password')
                 .populate('savedBooks');

                 return user;
            }
            
             throw new AuthenticationError('Please log in to view your saved books.');
            
        },

    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                console.log('incorrect credentials');
                throw new Error('Incorrect credentials');
            }
            const isCorrectPassword = await user.isCorrectPassword(password);

            if (!isCorrectPassword) {
                throw new AuthenticationError('Incorrect credentials');
              }
              const token = signToken(user);
              console.log(token);
              
              return { token, user };
        },
        saveBook: async (parent, args, context) => {
            const book = {...args}
            const user = await User.findOneAndUpdate(
                { username: context.user.username },
                { $addToSet: { savedBooks: book } },
                { new: true }
                )
                .select('-__v -password')
                 .populate('savedBooks');
            return user;
        },
        removeBook: async (parent, { bookId }, context) => {
            const user = await User.findOneAndUpdate(
                { username: context.user.username },
                { $pull: { savedBooks: {bookId: bookId} } },
                { new: true }
            )
            .select('-__v -password')
                 .populate('savedBooks');
            return user;
        }
    }
};

module.exports = resolvers;