import { useState } from "react";
import { addBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    try {
      dispatch(addBlog(newBlog));
    } catch (exception) {
      dispatch(
        setNotification(`Error: Failed to add blog ${blogObject.title}`, 5)
      );
    }

    setTitle("");
    setAuthor("");
    setUrl("");
    dispatch(setNotification(`A new blog ${title} by ${author} added`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            data-testid="title"
            type="text"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            type="text"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
