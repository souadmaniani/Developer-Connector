import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { clearErrors, registerUser } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";

const Register = () => {
  const { errors } = useSelector((state) => state);
  const dispatch = useDispatch();
  let history = useHistory();
  const [allValues, setAllValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });
  const onChange = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: allValues.name,
      email: allValues.email,
      password: allValues.password,
      password2: allValues.password2,
    };
    dispatch(registerUser(newUser, history));
  };

  useEffect(() => {
	dispatch(clearErrors());
  }, []);


  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                type="text"
                error={errors.name}
                placeholder="Name"
                name="name"
                value={allValues.name}
                onChange={onChange}
              />
              <TextFieldGroup
                type="email"
                error={errors.email}
                placeholder="Email Address"
                name="email"
                value={allValues.email}
                info="This site uses Gravatar so if you want a profile image, use
					a Gravatar email"
                onChange={onChange}
              />
              <TextFieldGroup
                type="password"
                error={errors.password}
                placeholder="Password"
                name="password"
                value={allValues.password}
                onChange={onChange}
              />
              <TextFieldGroup
                type="password"
                error={errors.password2}
                placeholder="Confirm Password"
                name="password2"
                value={allValues.password2}
                onChange={onChange}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
