import { useState } from "react";
import useFunctions from "../useFunctions";

import "./Comments.css";

function Comments({ comment, handleAddComment, handleCommentDelete }) {
  const [showInput, setShowInput] = useState(false);
  const {timeSince } = useFunctions();

  const [commentReply, setCommentReply] = useState("");
  const [like, setlike] = useState(0);

  function handlelike() {
    setlike(like + 1);
  }

  function handleOnchange(e) {
    setCommentReply(e.target.value);
  }
  function handleAdd() {
    //console.log("new reply :",commentReply);
    let newComment = {
      id: Date.now(),
      image: comment.image,
      username: comment.username,
      text: commentReply,
      timestamp: new Date().toISOString() ,// Store the current timestamp
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
            <img className="user-image" src={comment.image} />
            <div className="text-content">
              <h5>{comment.username}</h5>
              <h6>{comment.text}</h6>
            </div>
          </legend>
        </fieldset>

        {showInput && (
          <input
            type="text"
            autoFocus
            value={commentReply}
            onChange={handleOnchange}
          />
        )}
        {showInput ? (
          <div className="user_actions">
            <button onClick={handleAdd}>Add</button>
            <button onClick={() => setShowInput(false)}>Cancel</button>
          </div>
        ) : comment.text ? (
          <div className="user_actions">
            <button>{timeSince(comment.timestamp)}</button> {/* Display the time elapsed */}
            <button onClick={handlelike}>{like} like</button>
            <button onClick={() => setShowInput(true)}>Reply</button>
            <button onClick={() => handleCommentDelete(comment.id)}>
              Delete
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

export default Comments;
