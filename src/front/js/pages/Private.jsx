import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  let navigate = useNavigate();
  const { actions, store } = useContext(Context);

  useEffect(() => {
    if (!store.token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <h1 className="text-center">Work in Progress!!1</h1>
    </>
  );
};
