import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Navbar = () => {
  let navigate = useNavigate();
  const { actions, store } = useContext(Context);
  function handleLogout() {
    localStorage.removeItem("token");
    actions.Logout();
    navigate("/");
  }
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">JWT Authentication</span>
        </Link>
      </div>
      {store.token ? (
        <div className="m-auto">
          <button className="btn btn-danger" to="/" onClick={handleLogout}>
            Log out
          </button>
        </div>
      ) : (
        <div className="d-flex">
          <div className="me-2">
            <Link to="/signup">
              <button className="btn btn-primary">Sign up</button>
            </Link>
          </div>
          <div className="me-2">
            <Link to="/login">
              <button className="btn btn-primary">Log in</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
