import React, { useState } from "react";
import TextAreaFieldGroup from "../common/TextAreaGroup";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/actions/postAction";

const CommentForm = ({ postId }) => {
  const { errors, auth } = useSelector((state) => state);
  const [allValues, setallValues] = useState({
    text: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setallValues({ ...allValues, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { user } = auth;

    const newComment = {
      text: allValues.text,
      name: user.name,
      avatar: user.avatar,
    };
    dispatch(addComment(newComment, postId));
    setallValues({ ...allValues, text: "" });
  };
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a comment...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply to post"
                name="text"
                value={allValues.text}
                onChange={onChange}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
