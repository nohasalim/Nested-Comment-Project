import Comments from "./components/Comments";
import "./App.css";
import { commentData } from "./data/commentData";
import { useState } from "react";
import useFunctions from "./useFunctions";

function App() {
  const { addComment, deleteComment, addNewComment } = useFunctions();
  const [comments, setComments] = useState(commentData);
  const [commentAdd, setCommentAdd] = useState("");

  // Function to handle adding a reply to an existing comment
  const handleAddComment = (commentId, newComment) => {
    const updatedTree = comments.map((comment) =>
      addComment(comment, commentId, newComment)
    );
    setComments(updatedTree);
  };

  // Function to handle changes in the new comment input field
  const handleOnChange = (e) => {
    setCommentAdd(e.target.value);
  };

  // Function to handle adding a new comment
  const handleAddNewComment = () => {
    const newComment = {
      id: Date.now().toString(),
      image: "Images/image-amyrobson.png",
      username: "amyrobson",
      text: commentAdd,
      replies: [],
      timestamp: new Date().toISOString(), // Store the current timestamp
    };
    const updatedTree = addNewComment(comments, newComment);
    setComments(updatedTree);
    setCommentAdd(""); // Clear the input field after adding the comment
  };

  // Function to handle deleting a comment
  const handleCommentDelete = (commentId) => {
    const updatedTree = comments
      .map((comment) => deleteComment(comment, commentId))
      .filter((comment) => comment !== undefined);
    setComments(updatedTree);
  };

  return (
    <div className="App">
      {comments.map((comment) => (
        <Comments
          key={comment.id}
          comment={comment}
          timestamp={comment.timestamp}
          handleAddComment={handleAddComment}
          handleCommentDelete={handleCommentDelete}
        />
      ))}
      <div className="add-comment">
        <input
          type="text"
          placeholder=" Add A Public Comment ..."
          autoFocus
          value={commentAdd}
          onChange={handleOnChange}
        />
        <button onClick={handleAddNewComment} disabled={!commentAdd.trim()}>
          Comment
        </button>
      </div>
    </div>
  );
}

export default App;
