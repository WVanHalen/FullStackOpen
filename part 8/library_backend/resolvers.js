const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");
const Author = require("./Models/author");
const Book = require("./Models/book");
const User = require("./Models/user");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({
          $and: [{ author: author.id }, { genres: { $in: [args.genre] } }],
        }).populate("author");
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author.id }).populate("author");
      } else if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      const books = await Book.find({ author: author.id });
      return books.length;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
        }
        await author.save();

        const book = new Book({ ...args, author });
        await book.save();

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

        return book;
      } catch (error) {
        const errorMessage = "Adding a book has failed";

        if (error instanceof mongoose.Error.ValidationError) {
          console.log(error.message);

          if (error.errors.hasOwnProperty("name")) {
            errorMessage = "Adding a book failed. Author name not valid";
          } else if (error.errors.hasOwnProperty("title")) {
            errorMessage = "Adding a book failed. Title not valid";
          }
          throw new GraphQLError(errorMessage, {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        } else {
          console.log(error);
          throw new GraphQLError(errorMessage);
        }
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const foundAuthor = await Author.findOne({ name: args.name });
      if (foundAuthor) {
        foundAuthor.born = args.setBornTo;
        try {
          return await foundAuthor.save();
        } catch (error) {
          console.log(error);
          throw new GraphQLError("Editing author failed");
        }
      }
      return null;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
