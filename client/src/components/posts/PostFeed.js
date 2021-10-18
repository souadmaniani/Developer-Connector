import React from "react";
import PostItem from "./PostItem";

const PostFeed = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return <PostItem key={post._id} post={post} />;
      })}
    </div>
  );
};

export default PostFeed;
