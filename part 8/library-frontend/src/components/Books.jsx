/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [chosenGenre, setChosenGenre] = useState("");

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: chosenGenre },
  });

  const genreResult = useQuery(ALL_GENRES);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const genres = genreResult.data.allGenres;

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
