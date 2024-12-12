import { useState } from "react";
import PropTypes from "prop-types";
import useFunctions from "../useFunctions";
import "./Comments.css";

function Comments({ comment, handleAddComment, handleCommentDelete }) {
  // State to control the visibility of the input field for replies
  const [showInput, setShowInput] = useState(false);
  const { timeSince } = useFunctions();

  // State to manage the reply text
  const [commentReply, setCommentReply] = useState("");
  // State to manage the number of likes
  const [like, setLike] = useState(0);

  // Function to handle the like button click
  function handleLike() {
    setLike(like + 1);
  }

  // Function to handle changes in the reply input field
  function handleOnChange(e) {
    setCommentReply(e.target.value);
  }

  // Function to handle adding a new reply
  function handleAdd() {
    let newComment = {
      id: Date.now(),
      image: comment.image,
      username: comment.username,
      text: commentReply,
      timestamp: new Date().toISOString(), // Store the current timestamp
      replies: [],
    };
    handleAddComment(comment.id, newComment);
    setCommentReply("");
    setShowInput(false);
  }

  return (
    <div className="comment-wrap">
      <div className={`${comment.text && "comment-container"}`}>
        <fieldset className="comment-data">
          <legend>
            <img
              className="user-image"
              src={comment.image}
              alt={`${comment.username}'s avatar`}
            />
            <div className="text-content">
              <h5>{comment.username}</h5>
              <h6>{comment.text}</h6>
            </div>
          </legend>
        </fieldset>

        {showInput && (
          <input
            type="text"
            placeholder="Add A Reply..."
            autoFocus
            value={commentReply}
            onChange={handleOnChange}
          />
        )}
        {showInput ? (
          <div className="user_actions">
            <button onClick={handleAdd} disabled={!commentReply.trim()}>
              Add
            </button>
            <button onClick={() => setShowInput(false)}>Cancel</button>
          </div>
        ) : comment.text ? (
          <div className="user_actions">
            <button>{timeSince(comment.timestamp)}</button>{" "}
            {/* Display the time elapsed */}
            <button onClick={handleLike}>
              <span id="like-count"> like </span>
            </button>
            <button onClick={() => setShowInput(true)}>Reply</button>
            <button onClick={() => handleCommentDelete(comment.id)}>
              Delete
            </button>
            <button>
              <span
                style={{
                  color: "blue",
                  display: like > 0 ? "inline" : "none",
                }}
              >
                {like}
                <i className="fas fa-thumbs-up"></i>
              </span>
            </button>
          </div>
        ) : null}
      </div>
      <div className="replies">
        {comment.replies &&
          comment.replies.length > 0 &&
          comment.replies.map((ele) => (
            <Comments
              key={ele.id}
              comment={ele}
              handleAddComment={handleAddComment}
              handleCommentDelete={handleCommentDelete}
            />
          ))}
      </div>
    </div>
  );
}
Comments.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  handleAddComment: PropTypes.func.isRequired,
  handleCommentDelete: PropTypes.func.isRequired,
};
export default Comments;
