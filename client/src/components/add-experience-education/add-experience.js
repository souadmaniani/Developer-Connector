import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaGroup";
import { useSelector, useDispatch } from "react-redux";
import { addExperience } from "../../redux/actions/profileAction";

const AddExperience = () => {
  const { errors } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [allValues, setAllValues] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
  });
  const onSubmit = (e) => {
    e.preventDefault();

    const expData = {
      company: allValues.company,
      title: allValues.title,
      location: allValues.location,
      from: allValues.from,
      to: allValues.to,
      current: allValues.current,
      description: allValues.description,
    };
    dispatch(addExperience(expData, history));
  };

  const onChange = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const onCheck = (e) => {
    setAllValues({
      ...allValues,
      disabled: !allValues.disabled,
      current: !allValues.current,
    });
  };

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job or position that you have had in the past or current
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={allValues.company}
                onChange={onChange}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={allValues.title}
                onChange={onChange}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={allValues.location}
                onChange={onChange}
                error={errors.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={allValues.from}
                onChange={onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={allValues.to}
                onChange={onChange}
                error={errors.to}
                disabled={allValues.disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={allValues.current}
                  checked={allValues.current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Job Description"
                name="description"
                value={allValues.description}
                onChange={onChange}
                error={errors.description}
                info="Tell us about the the position"
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExperience;
