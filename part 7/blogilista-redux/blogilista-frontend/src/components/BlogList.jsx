import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.votes - a.votes)
        .map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <div style={blogStyle}>
              {blog.title} by {blog.author}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default BlogList;
