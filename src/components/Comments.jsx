import { useState } from "react";
import "./Comments.css";

function Comments({ comment, handleAddComment, handleCommentDelete }) {
  const [showInput, setShowInput] = useState(false);
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
      image:comment.image,
      username:comment.username,
      text: commentReply,
      replies: [],
    };
    handleAddComment(comment.id, newComment);
    setCommentReply("");
    setShowInput(false);
  }
  return (
    <div className="comment-wrap">
      <div className={`${comment.text && "comment-container"}`}>
        <div className="comment-data">
          <img src={comment.image} />
          <div className="text-content">
            <h4>{comment.username}</h4>
            <p>{comment.text}</p>
          </div>
        </div>

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
            <button onClick={() => setShowInput(true)}>Reply</button>
            <button onClick={() => handleCommentDelete(comment.id)}>
              Delete
            </button>
            <button onClick={handlelike}>{like} like</button>
          </div>
        ) : null}
      </div>
      <div className="replies" >
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
