import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.votes - a.votes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;

/*
            username={user.username}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}*/
