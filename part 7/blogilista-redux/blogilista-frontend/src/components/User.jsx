import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user) return null;

  return (
    <div>
      <h1>{user.name ? user.name : "No name"}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
