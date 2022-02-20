const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { AuthenticateToken, signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me:  (parent, args, context) => {
            if(context.user) {
                 const user = await User.findById({ _id: context.user._id })
                 .select('-__v -password')
                 .populate('books');

                 return user;
            }
           
             throw new AuthenticationError('Please log in to view your saved books.');
            
        },
    }
};

module.exports = resolvers;