/* eslint-disable react/prop-types */

import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS, {
    skip: !props.favoriteGenre,
    variables: { genre: props.favoriteGenre },
  });

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (props.favoriteGenre === "") {
    return <div>You have no favorite genre</div>;
  }

  if (!data) {
    return <div>Failed to load recommended books</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      {data.allBooks.length === 0 ? (
        <div>you have no books in your favorite genre</div>
      ) : (
        <div>
          <p>
            books in your favorite genre <b>{props.favoriteGenre}</b>
          </p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Recommend;
