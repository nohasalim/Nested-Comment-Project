function useFunctions() {
    const addComment = (tree, commentId, newComment) => {
      if (tree.id === commentId) {
        tree.replies.unshift(newComment);
        return tree;
      }
      const updatedReplies = tree.replies.map((ele) =>
        addComment(ele, commentId, newComment)
      );
      return { ...tree, replies: updatedReplies };
    };
  
    const deleteComment = (tree, commentId) => {
      if (tree.id === commentId) {
        return undefined; // Return undefined to indicate the comment should be removed
      }
      const updatedReplies = tree.replies
        .map((ele) => deleteComment(ele, commentId))
        .filter((ele) => ele !== undefined); // Filter out undefined values
      return { ...tree, replies: updatedReplies };
    };
  
    return { addComment, deleteComment };
  }
  
  export default useFunctions;
  