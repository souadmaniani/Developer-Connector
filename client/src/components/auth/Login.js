import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { clearErrors, loginUser } from "../../redux/actions/authAction";
import TextFieldGroup from "../common/TextFieldGroup";

const Login = () => {
  const { auth, errors } = useSelector((state) => state);
  const dispatch = useDispatch();
  let history = useHistory();
  const [allValues, setAllValues] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: allValues.email,
      password: allValues.password,
    };
    dispatch(loginUser(user));
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  useEffect(() => {
    if (auth.isAuthentified) history.push("/dashboard");
  }, [auth.isAuthentified, history]);

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                type="email"
                error={errors.email}
                placeholder="Email Address"
                name="email"
                value={allValues.email}
                onChange={onChange}
              />
              <TextFieldGroup
                type="password"
                error={errors.password}
                placeholder="password"
                name="password"
                value={allValues.password}
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

export default Login;
