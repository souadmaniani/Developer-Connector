import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaGroup";
import { useSelector, useDispatch } from "react-redux";
import { addEducation } from "../../redux/actions/profileAction";

const AddEducation = () => {
  const { errors } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [allValues, setAllValues] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
  });
  const onSubmit = (e) => {
    e.preventDefault();

    const eduData = {
        school: allValues.school,
        degree: allValues.degree,
        fieldofstudy: allValues.fieldofstudy,
        from: allValues.from,
        to: allValues.to,
        current: allValues.current,
        description: allValues.description
      };
  
    dispatch(addEducation(eduData, history));
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
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, bootcamp, etc that you have attended
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={allValues.school}
                onChange={onChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* Degree or Certification"
                name="degree"
                value={allValues.degree}
                onChange={onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="* Field of Study"
                name="fieldofstudy"
                value={allValues.fieldofstudy}
                onChange={onChange}
                error={errors.fieldofstudy}
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
                disabled={allValues.disabled ? 'disabled' : ''}
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
                placeholder="Program Description"
                name="description"
                value={allValues.description}
                onChange={onChange}
                error={errors.description}
                info="Tell us about the program that you were in"
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

export default AddEducation;
