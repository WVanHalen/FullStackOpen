import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user) return null;

  return (
    <div>
      <h1>{user.name ? user.name : "Anonymous"}</h1>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroupItem key={blog.id}>{blog.title}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
