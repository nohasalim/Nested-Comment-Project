import Comments from "./components/Comments";
import "./App.css";
import { commentData } from "./data/commentData";
import { useState } from "react";
import useFunctions from "./useFunctions";

function App() {
  const { addComment, deleteComment, addNewComment,timeSince } = useFunctions();
  const [comments, setComments] = useState(commentData);
  const [commentAdd, setCommentAdd] = useState("");

  const handleAddComment = (commentId, newComment) => {
    const updatedTree = comments.map((comment) =>
      addComment(comment, commentId, newComment)
    );
    setComments(updatedTree);
  };

  const handleOnChange = (e) => {
    setCommentAdd(e.target.value);
  };

  const handleAddNewComment = () => {
    const newComment = {
      id: Date.now().toString(),
      image: "Images/image-amyrobson.png",
      username: "amyrobson",
      text: commentAdd,
      replies: [],
      timestamp: new Date().toISOString() // Store the current timestamp
    };
    const updatedTree = addNewComment(comments, newComment);
    setComments(updatedTree);
    setCommentAdd(""); // Clear the input field after adding the comment
  };

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
        <button onClick={handleAddNewComment}>Comment</button>
      </div>
    </div>
  );
}

export default App;
