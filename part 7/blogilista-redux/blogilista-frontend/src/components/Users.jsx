import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name ? user.name : "Jaakko Teppo"}
                </Link>
              </td>
              <td>{user.blogs.lengty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
