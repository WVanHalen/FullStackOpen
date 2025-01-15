/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [chosenGenre, setChosenGenre] = useState("");
  //This for filtered books
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: chosenGenre },
  });
  //And this for every book in library, for extracting the genres
  const everyBook = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  // Get all genres
  const allGenres = everyBook.data.allBooks.flatMap((book) => book.genres);
  // Get the unique genres from all
  const genres = [...new Set(allGenres)];

  return (
    <div>
      <h2>books</h2>
      {chosenGenre.length > 0 ? (
        <div>
          in genre <b>{chosenGenre}</b>
        </div>
      ) : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setChosenGenre(genre)}>
            {genre}
          </button>
        ))}
        <button
          onClick={() => {
            setChosenGenre("");
          }}
        >
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
