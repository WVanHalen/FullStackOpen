import { useDispatch } from "react-redux";
import { addNewComment } from "../reducers/blogReducer";
import { Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    dispatch(addNewComment(blog.id, comment));
    event.target.comment.value = "";
  };

  return (
    <div>
      <h3>Comments</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Comment: </Form.Label>
          <Form.Control type="text" name="comment" />
        </Form.Group>
        <div className="my-3">
          <Button variant="primary" type="submit">
            Add comment
          </Button>
        </div>
      </Form>
      <ListGroup>
        {blog.comments.map((comment, index) => (
          <ListGroupItem key={index}>{comment}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default Comments;
