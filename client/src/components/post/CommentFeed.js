import React from "react";
import CommentItem from "./CommentItem";

const CommentFeed = ({ postId, comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return <CommentItem key={comment._id} comment={comment} postId={postId} />;
      })}
    </div>
  );
};

export default CommentFeed;
