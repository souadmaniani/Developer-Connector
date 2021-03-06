import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../redux/actions/postAction";

const CommentItem = ({ postId, comment }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onDeleteClick = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId));
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>
          {comment.user === auth.user.id ? (
            <button
              onClick={() => onDeleteClick(postId, comment._id)}
              type="button"
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
