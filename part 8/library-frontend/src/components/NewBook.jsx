/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK } from "../queries";

import { useState } from "react";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, response) => {
      const bookData = response?.data?.addBook;

      if (!bookData) {
        return;
      }

      if (bookData?.author) {
        const allAuthors = cache.readQuery({ query: ALL_AUTHORS });

        if (allAuthors?.allAuthors) {
          let allAuthorsData = [...allAuthors.allAuthors];
          const authorExists = allAuthorsData.find(
            (author) => author.name === bookData.author.name
          );

          if (!authorExists) {
            const newAuthor = {
              ...bookData.author,
              bookCount: 1,
              born: null,
              id: null,
            };
            allAuthorsData.push(newAuthor);
          } else {
            allAuthorsData = allAuthorsData.map((author) => {
              if (author.name === bookData.author.name) {
                return { ...author, bookCount: author.bookCount + 1 };
              }
              return author;
            });
          }

          cache.writeQuery({
            query: ALL_AUTHORS,
            data: {
              allAuthors: allAuthorsData,
            },
          });
        }

        if (
          props.favoriteGenre &&
          bookData?.genres.includes(props.favoriteGenre)
        ) {
          const allFavoriteBooks = cache.readQuery({
            query: ALL_BOOKS,
            variables: { genre: props.favoriteGenre },
          });
          if (allFavoriteBooks?.allBooks) {
            cache.writeQuery({
              query: ALL_BOOKS,
              variables: { genre: props.favoriteGenre },
              data: {
                allBooks: allFavoriteBooks.allBooks.concat(bookData),
              },
            });
          }
        }
      }

      if (bookData?.genres) {
        const genres = [...bookData.genres, ""];
        genres.forEach((genre) => {
          if (genre !== props.favoriteGenre) {
            const allBooks = cache.readQuery({
              query: ALL_BOOKS,
              variables: { genre },
            });

            if (allBooks?.allBooks) {
              cache.writeQuery({
                query: ALL_BOOKS,
                variables: { genre },
                data: { allBooks: allBooks.allBooks.concat(bookData) },
              });
            }
          }
        });
      }

      const allBooksData = cache.readQuery({ query: ALL_BOOKS });
      cache.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: allBooksData.allBooks.concat(bookData) },
      });
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: { title, author, published: parseInt(published), genres },
    });

    console.log("add book...");

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
