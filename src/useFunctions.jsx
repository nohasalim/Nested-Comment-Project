function useFunctions() {
  // Function to calculate the time elapsed since a given date
  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 3600);

    if (interval >= 1) {
      return interval + "h"; // Return hours if more than 1 hour has passed
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + "m"; // Return minutes if more than 1 minute has passed
    }
    return Math.floor(seconds) + "s"; // Return seconds otherwise
  };

  // Function to add a reply to an existing comment
  const addComment = (tree, commentId, newComment) => {
    if (tree.id === commentId) {
      tree.replies.unshift(newComment); // Add the new comment to the replies
      return tree;
    }
    const updatedReplies = tree.replies.map((ele) =>
      addComment(ele, commentId, newComment)
    );
    return { ...tree, replies: updatedReplies }; // Return the updated tree with new replies
  };

  // Function to add a new comment
  const addNewComment = (tree, newComment) => {
    return [...tree, newComment]; // Add the new comment to the tree
  };

  // Function to delete a main comment or a reply to a comment
  const deleteComment = (tree, commentId) => {
    if (tree.id === commentId) {
      return undefined; // Return undefined to indicate the comment should be removed
    }
    const updatedReplies = tree.replies
      .map((ele) => deleteComment(ele, commentId))
      .filter((ele) => ele !== undefined); // Filter out undefined values
    return { ...tree, replies: updatedReplies }; // Return the updated tree with remaining replies
  };

  return { addComment, addNewComment, deleteComment, timeSince };
}

export default useFunctions;
