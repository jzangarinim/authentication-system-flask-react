import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  let navigate = useNavigate();
  const { actions, store } = useContext(Context);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  async function handleLogin() {
    let response = await actions.Login(user.email, user.password);
    if (response) {
      navigate("/private");
    }
  }

  useEffect(() => {
    if (store.token) {
      navigate("/private");
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="col 12 mt-3">
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
              value={user.email}
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
              value={user.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="col-2 btn btn-primary me-3"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
