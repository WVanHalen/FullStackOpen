import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";

const Home = () => {
  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default Home;
