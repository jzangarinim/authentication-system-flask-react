import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  let navigate = useNavigate();
  const { actions, store } = useContext(Context);
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  async function handleRegister() {
    let response = actions.Register(
      user.email,
      user.password,
      user.name,
      user.last_name
    );
    if ((await response) === 201) {
      navigate("/login");
    }
  }

  return (
    <>
      <div className="container">
        <div className="col 12 mt-3">
          <div className="row mb-3 needs-validation">
            <label htmlFor="nameInput" className="form-label">
              First Name
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="nameInput"
              placeholder="Your Name"
              defaultValue={null}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="lastNameInput" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="last_nameInput"
              placeholder="Your Last Name"
              defaultValue={null}
              name="last_name"
              onChange={handleChange}
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email address
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              required
              id="passwordInput"
              className="form-control"
              aria-labelledby="passwordHelpBlock"
              name="password"
              onChange={handleChange}
            />
            <div id="passwordHelpBlock" className="form-text">
              Your password must be at least 8 characters long.
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-end">
          <button
            type="button"
            className="col-2 btn btn-primary me-3"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};
