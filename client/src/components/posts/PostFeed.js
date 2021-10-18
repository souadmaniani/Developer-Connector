import React from "react";
import PostItem from "./PostItem";

const PostFeed = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return <PostItem key={post._id} post={post}  showActions={true} />;
      })}
    </div>
  );
};

export default PostFeed;
