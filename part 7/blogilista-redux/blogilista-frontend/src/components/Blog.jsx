import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";
import { deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams, useNavigate } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login);

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const deleteButtonStyle = {
    backgroundColor: "royalblue",
    borderRadius: "6px",
  };

  const handleLike = () => {
    try {
      dispatch(likeBlog(blog));
      dispatch(setNotification(`Blog ${blog.title} updated successfully`, 5));
    } catch (exception) {
      dispatch(
        setNotification(`Error: Failed to update blog ${blog.title}`, 5)
      );
    }
  };

  const handleDelete = () => {
    try {
      dispatch(deleteBlog(blog.id));
      dispatch(setNotification(`Blog ${blog.title} removed`, 5));
      navigate("/");
    } catch (e) {
      setNotification(`Error: Failed to delete blog ${blog.title}`, 5);
    }
  };

  if (!blog) return null;

  return (
    <div className="blog">
      <h3>
        {blog.title} {blog.author}
      </h3>
      {blog.url}
      <div>
        <span>likes {blog.likes}</span>
        <button onClick={handleLike}>like</button>
      </div>
      <div>
        {blog.user.name ? `added by ${blog.user.name}` : "added by No name"}
      </div>
      <div>
        {user.username === blog.user.username ? (
          <button style={deleteButtonStyle} onClick={handleDelete}>
            remove
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
