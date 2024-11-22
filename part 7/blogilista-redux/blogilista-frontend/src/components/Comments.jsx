import { useDispatch } from "react-redux";
import { addNewComment } from "../reducers/blogReducer";

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
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input name="comment" />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
