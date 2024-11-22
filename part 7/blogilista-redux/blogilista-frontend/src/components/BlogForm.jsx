import { addBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

const BlogForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };

    dispatch(addBlog(newBlog));

    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
  };

  return (
    <div>
      <h2>Add blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control data-testid="title" type="text" name="title" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control data-testid="author" type="text" name="author" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url:</Form.Label>
          <Form.Control data-testid="url" type="text" name="url" />
        </Form.Group>
        <div className="my-3">
          <Button variant="primary" type="submit">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BlogForm;
