import Comments from "./components/Comments";
import "./App.css";
import { commentData } from "./data/commentData";
import { useState } from "react";
import useFunctions from "./useFunctions";

function App() {
  const { addComment, deleteComment } = useFunctions();
  const [comments, setComments] = useState(commentData);

  const handleAddComment = (commentId, newComment) => {
    const updatedTree = comments.map((comment) =>
      addComment(comment, commentId, newComment)
    );
    setComments(updatedTree);
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
          handleAddComment={handleAddComment}
          handleCommentDelete={handleCommentDelete}
        />
      ))}
    </div>
  );
}

export default App;
