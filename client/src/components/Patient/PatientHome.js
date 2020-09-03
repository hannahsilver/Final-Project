import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { useSelector, useDispatch } from "react-redux";
import {
  requestPatient,
  receivePatient,
  receiveDoctors,
  requestDoctors,
  requestAppointments,
  receiveAppointments,
} from "../../actions";

import Doctors from "./Doctors";
import AddDoctor from "./AddDoctor";
import SignIn from "../SignIn";

const PatientHome = () => {
  const user = useSelector((state) => state.currentUser.currentUser);
  const status = useSelector((state) => state.currentUser.status);
  // const role = useSelector((state) => state.currentUser.role);
  const doctors = useSelector((state) => state.doctors.doctors);
  const doctorStatus = useSelector((state) => state.doctors.status);
  const patient = useSelector((state) => state.patient.patient);
  const patientStatus = useSelector((state) => state.patient.status);
  const appointments = useSelector((state) => state.appointments.appointments);
  const appointmentStatus = useSelector((state) => state.appointments.status);

  console.log(doctors);
  const dispatch = useDispatch();

  const handleGetPatient = () => {
    dispatch(requestPatient());
    fetch(`/patients/${user}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          dispatch(receivePatient(json));
        } else {
          console.log("something went wrong");
        }
      });
  };

  React.useEffect(() => {
    handleGetPatient();
  }, []);

  const handleGetDoctors = () => {
    dispatch(requestDoctors(user));
    fetch(`/${user}/doctors`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          dispatch(receiveDoctors(json.doctors));
        } else {
          console.log("something went wrong");
        }
      });
  };

  React.useEffect(() => {
    if (status === "idle") {
      handleGetDoctors();
    }
  }, [status]);

  const handleGetAppointments = (doctor) => {
    dispatch(requestAppointments());
    fetch(`/appointment/${doctor._id}/${user}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          dispatch(receiveAppointments(json.dates));
        } else {
          console.log("something went wrong");
        }
      });
  };

  React.useEffect(() => {
    if (doctorStatus === "idle") {
      return doctors.map((doctor) => {
        handleGetAppointments(doctor);
      });
    }
  }, [doctorStatus]);

  console.log(doctors);
  return (
    <Wrapper>
      {status && status === "loading" ? (
        <>loading...</>
      ) : (
        <>
          <LeftDiv>
            <LogLink to="/form">log today's activity</LogLink>
            {patientStatus === "idle" && (
              <MedWrapper>
                {patient.patient.meds && (
                  <MedBox>
                    <p>{patient.patient.meds}</p>
                    {patient.patient.medsNotes && (
                      <p>{patient.patient.medsNotes}</p>
                    )}
                  </MedBox>
                )}

                {/* <p>you currently have no upcoming appointments</p> */}
              </MedWrapper>
            )}
            <AppointmentWrapper>
              {appointmentStatus === "idle" && (
                <UpcomingAppts>
                  <StyledP>upcoming appointments:</StyledP>
                  {appointments.map((date) => {
                    return (
                      <>
                        <StyledMoment locale="LLLL" aria-hidden={true}>
                          {date.date}
                        </StyledMoment>
                        <p>with Colleen Corden</p>
                      </>
                    );
                  })}
                </UpcomingAppts>
              )}
            </AppointmentWrapper>
          </LeftDiv>
          <div>
            <DoctorWrapper>
              {doctorStatus && doctorStatus === "idle" ? (
                <>
                  {doctors.map((doctor) => {
                    return (
                      <div>
                        <Doctors doctor={doctor} />
                      </div>
                    );
                  })}
                </>
              ) : (
                <p>you currently aren't registered with a practitioner</p>
              )}
              <AddDoctor />
            </DoctorWrapper>
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const LeftDiv = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;
const MedBox = styled.div`
  height: 125px;
  width: 500px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MedWrapper = styled.div``;

const AppointmentWrapper = styled.div`
  background: #f6ae2d;
  width: 500px;
  padding: 50px;
`;

const UpcomingAppts = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const StyledMoment = styled(Moment)`
  margin-top: 20px;
`;

const StyledP = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const LogLink = styled(Link)`
  color: #33658a;
  font-weight: bold;
  text-decoration: none;
  font-size: 30px;
  margin-bottom: 30px;
  &:hover {
    color: lightblue;
  }
`;

const DoctorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding: 50px;
  width: 400px;
  height: 300px;
  background: #86bbd8;
  color: white;
`;

export default PatientHome;
