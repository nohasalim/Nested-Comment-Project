function useFunctions() {
  const  timeSince=(date)=> {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 3600);
  
    if (interval >= 1) {
      return interval + "h";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + "m";
    }
    return Math.floor(seconds) + "s";
  }
  
  // Add reply to existing comment
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

  // Add new comment
  const addNewComment = (tree, newComment) => {
    return [...tree,newComment];
  };

  // Delete main comment or a reply to a comment
  const deleteComment = (tree, commentId) => {
    if (tree.id === commentId) {
      return undefined; // Return undefined to indicate the comment should be removed
    }
    const updatedReplies = tree.replies
      .map((ele) => deleteComment(ele, commentId))
      .filter((ele) => ele !== undefined); // Filter out undefined values
    return { ...tree, replies: updatedReplies };
  };

  return { addComment, addNewComment, deleteComment,timeSince };
}

export default useFunctions;
