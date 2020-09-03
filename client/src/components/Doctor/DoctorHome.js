import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import { Icon } from "react-icons-kit";
import { chevronLeft } from "react-icons-kit/fa/chevronLeft";

import Patients from "./Patients";
import Patient from "./Patient";

import { useSelector, useDispatch } from "react-redux";
import {
  receivePatients,
  requestPatients,
  requestAppointments,
  receiveAppointments,
} from "../../actions";

const DoctorHome = () => {
  const [toggled, setToggled] = React.useState(false);
  const [patient, setPatient] = React.useState("");
  const [closed, setClosed] = React.useState(false);

  const slide = useSpring({
    transform: toggled ? "width: 0px" : "width: 100%",
  });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.currentUser.currentUser);
  const status = useSelector((state) => state.currentUser.status);
  const patients = useSelector((state) => state.patients.patients);
  const patientStatus = useSelector((state) => state.patients.status);

  const handleGetPatients = () => {
    dispatch(requestPatients(user));
    fetch(`/${user}/patients`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          dispatch(receivePatients(json.patients));
        } else {
          console.log("something went wrong");
        }
      });
  };

  React.useEffect(() => {
    if (status === "idle") {
      handleGetPatients();
    }
  }, [status]);

  const getPatient = (patient) => {
    setToggled(true);
    setPatient(patient);
    handleGetAppointments(patient);
  };

  const handleGetAppointments = (patient) => {
    dispatch(requestAppointments());
    fetch(`/appointment/${user}/${patient._id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          dispatch(receiveAppointments(json.dates));
        } else {
          console.log("something went wrong");
        }
      });
  };
  // console.log(patient);

  return (
    <Wrapper>
      {status && status === "loading" ? (
        <>loading...</>
      ) : (
        <>
          <LeftDiv>
            <PatientsTitle>
              your patients{" "}
              {toggled && (
                <Icon icon={chevronLeft} onClick={(ev) => setToggled(false)} />
              )}
            </PatientsTitle>
            <PatientsDiv>
              {patientStatus && patientStatus === "idle" ? (
                <>
                  {patients.map((patient) => {
                    return (
                      <StyledDiv onClick={(ev) => getPatient(patient)}>
                        <Patients patient={patient} />
                      </StyledDiv>
                    );
                  })}
                </>
              ) : (
                <>
                  <p>You currently have no patients registered.</p>
                  <p>
                    To sign up patients, you can use your authentication key:
                    5f485827f00a4b5de4f94d93
                  </p>
                </>
              )}
            </PatientsDiv>
          </LeftDiv>
          {toggled && (
            <animated.div
              style={{ width: "1200px", height: "100vh", ...slide }}
            >
              <Patient patient={patient} />
            </animated.div>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 40px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const PatientsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  font-size: 25px;
  border-bottom: 2px solid #0c4a60;
`;

const PatientsDiv = styled.div`
  margin-top: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const StyledDiv = styled.div`
  width: 300px;
  margin-bottom: 20px;
  font-size: 20px;
`;

const PatientDiv = styled.div`
  width: 1200px;
  height: 100vh;
  background: lightblue;
`;
export default DoctorHome;
