import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";
import { deleteBlog } from "../reducers/blogReducer";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Comments from "./Comments";

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login);

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id, blog.title));
    navigate("/");
  };

  if (!blog) return null;

  return (
    <div className="blog">
      <h3>
        {blog.title} {blog.author}
      </h3>
      {blog.url}
      <div>
        <span style={{ display: "inline-block", marginRight: "5px" }}>
          likes {blog.likes}
        </span>
        <Button onClick={handleLike}>Like</Button>
      </div>
      <div>added by {blog.user.name ? blog.user.name : "Anonymous"}</div>
      <div className="my-3">
        {user.username === blog.user.username ? (
          <Button variant="danger" onClick={handleDelete}>
            Remove
          </Button>
        ) : null}
      </div>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
