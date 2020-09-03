import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

import { checkCurrentUser, refreshPage } from "../actions";

import PatientHome from "./Patient/PatientHome";
import DoctorHome from "./Doctor/DoctorHome";
import SignIn from "./SignIn";

const HomePage = () => {
  const user = useSelector((state) => state.currentUser.currentUser);
  const status = useSelector((state) => state.currentUser.status);
  const role = useSelector((state) => state.currentUser.role);

  return (
    <>
      {status === "loading" && <SignIn />}
      {status === "idle" && role === "patient" && <PatientHome />}
      {status === "idle" && role === "doctor" && <DoctorHome />}
    </>
  );
};

export default HomePage;
