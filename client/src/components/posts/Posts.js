import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import { getPosts } from "../../redux/actions/postAction";
import Spinner from "../common/Spinner";

const Posts = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  let postContent;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  
  if (posts === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = <PostFeed posts={posts} />;
  }

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
