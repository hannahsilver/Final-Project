import React from "react";
import styled, { keyframes } from "styled-components";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Patient from "./Patient";

const Patients = (patient) => {
  const user = useSelector((state) => state.currentUser.currentUser);
  const status = useSelector((state) => state.currentUser.status);

  const [toggled, setToggled] = React.useState(false);

  // const style = useSpring({
  //   transform: toggled ? "translateY(50px)" : "translateY(0px)",
  // });

  let history = useHistory();

  const patientProfile = () => {
    history.push(`/patient/${patient.patient._id}`);
  };

  return (
    <>
      <PatientButton
      // onClick={(ev) => {
      //   patientProfile();
      // }}
      // onClick={() => setToggled(!toggled)}
      >
        <p>
          {patient.patient.lastName}, {patient.patient.firstName}
        </p>
      </PatientButton>
      {/* <StyledDiv></StyledDiv> */}
    </>
  );
};

const PatientButton = styled.button`
  text-align: left;
  font-size: 20px;
  background: white;
  padding: 15px 15px 30px 15px;
  border: none;
  width: 200px;
  height: 30px;
  margin: 15px;

  &:hover {
    cursor: pointer;
    color: lightblue;
  }
`;

const fadeIn = keyframes`
from {
  translateX(-800px)
} to {
  translateX(500px)
}
`;

const StyledDiv = styled.div`
  background: red;
  width: 800px;
  animation: ${fadeIn} 500ms;
`;

export default Patients;
