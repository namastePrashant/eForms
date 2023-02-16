import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  postAuth,
  selectErrors,
  selectAuthStatus,
} from "../../../store/reducer/auth";
import { useHistory } from "react-router-dom";

import AuthForm from "../forms/auth-form";

export default function Auth() {
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(selectAuthStatus);

  const handleSubmit = (values) => {
    const payload = values;
    dispatch(postAuth(payload));
  };

  if (isAuthenticated) {
    history.push("/");
  }
  return (
    <div className="d-flex justify-content-center mt-5">
      <AuthForm
        title="Altimate Daily Checklist"
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
}
