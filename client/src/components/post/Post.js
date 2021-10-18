import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../redux/actions/postAction";
import CommentForm from "./CommentForm";
import CommentFeed from './CommentFeed'

const Post = () => {
  const { post, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { id } = useParams();
  let postContent;

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    );
  }

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
