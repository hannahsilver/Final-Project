import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import Moment from "react-moment";

import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/fa/plus";

import "react-datepicker/dist/react-datepicker.css";

import { useParams } from "react-router-dom";

import {
  requestPatient,
  receivePatient,
  requestForms,
  receiveForms,
} from "../../actions";

import SignIn from "../SignIn";

const Patient = (patient) => {
  // const patient = useSelector((state) => state.patient.patient);
  // const patientStatus = useSelector((state) => state.patient.status);
  // const forms = useSelector((state) => state.forms.forms);
  const user = useSelector((state) => state.currentUser.currentUser);
  // const userStatus = useSelector((state) => state.currentUser.status);
  const appointments = useSelector((state) => state.appointments.appointments);
  const appointmentStatus = useSelector((state) => state.appointments.status);
  const formStatus = useSelector((state) => state.forms.status);
  const form = useSelector((state) => state.forms.forms);

  const [addMeds, setAddMeds] = React.useState(false);
  const [meds, setMeds] = React.useState("");
  const [medsNotes, setMedsNotes] = React.useState("");
  const [toggle, setToggle] = React.useState(true);

  const [date, setDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setDate(date);
  };

  console.log(date, "date");

  const _id = patient.patient._id;

  const dispatch = useDispatch();

  // const handleGetPatient = () => {
  //   dispatch(requestPatient());
  //   fetch(`/patients/${_id}`)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json.status === 201) {
  //         dispatch(receivePatient(json));
  //       } else {
  //         console.log("something went wrong");
  //       }
  //     });
  // };

  const handleGetForms = () => {
    dispatch(requestForms());
    fetch(`/${_id}/form`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          dispatch(receiveForms(json.forms));
        } else {
          console.log("something went wrong");
        }
      });
  };

  // React.useEffect(() => {
  //   handleGetPatient(_id);
  // }, []);

  React.useEffect(() => {
    handleGetForms(_id);
  }, []);

  const handleDate = (ev) => {
    ev.preventDefault();

    console.log(date);
    fetch(`/appointment`, {
      method: "POST",
      body: JSON.stringify({ date, patient: _id, doctor: user }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          console.log(json);
        } else {
          console.log("something went wrong");
        }
      });
  };

  const handleAddMeds = (ev) => {
    ev.preventDefault();

    fetch(`/patients/${patient.patient._id}`, {
      method: "PUT",
      body: JSON.stringify({ meds, medsNotes }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          console.log(json);
        } else {
          console.log("something went wrong");
        }
      });
  };

  return (
    <Wrapper>
      {/* {userStatus && userStatus === "idle" ? (
        <>
          {patientStatus && patientStatus === "loading" ? (
            <>loading patient</>
          ) : (
            <> */}
      <Header>
        <PatientName>
          {patient.patient.firstName} {patient.patient.lastName}
        </PatientName>
        <Title onClick={(e) => setToggle(true)}>Appointments</Title>
        <Title onClick={(e) => setToggle(false)}>Logs</Title>
      </Header>
      <Body>
        <Details>
          <StyledP>
            email: <span>{patient.patient.email}</span>
          </StyledP>
          {patient.patient.phone && (
            <StyledP>
              phone: <span>{patient.patient.phone}</span>{" "}
            </StyledP>
          )}
          {patient.patient.meds && (
            <>
              <StyledP>
                medication: <span>{patient.patient.meds}</span>
              </StyledP>
              {patient.patient.medsNotes && (
                <StyledP>
                  notes: <span>{patient.patient.medsNotes}</span>{" "}
                </StyledP>
              )}
            </>
          )}
          <MedDiv>
            <Icon onClick={(ev) => setAddMeds(!addMeds)} icon={plus} />

            {addMeds ? (
              // <Form>
              <Form onSubmit={handleAddMeds}>
                <label>medication:</label>
                <input
                  type="text"
                  name="meds"
                  value={meds}
                  onChange={(e) => setMeds(e.target.value)}
                />
                <label>notes:</label>
                <textarea
                  type="text"
                  name="meds"
                  value={medsNotes}
                  onChange={(e) => setMedsNotes(e.target.value)}
                />
                <Button onClick={(ev) => setAddMeds(!addMeds)}>add</Button>
              </Form>
            ) : (
              <p>add medication</p>
            )}
          </MedDiv>
          <Button>update patient</Button>

          <Button>remove patient</Button>
        </Details>
        {toggle ? (
          <Appointments>
            <Form onSubmit={handleDate}>
              Set Appointment
              <DatePicker
                locale="es"
                selected={date}
                onChange={handleDateChange}
                showTimeSelect
                // dateFormat="Pp"
              />
              <Button type="submit">set</Button>
            </Form>
            {appointmentStatus === "idle" && (
              <UpcomingAppts>
                <StyledP>upcoming appointments:</StyledP>
                {appointments.map((date) => {
                  return <Moment parse="YYYY-MM-DD HH:mm">{date.date}</Moment>;
                })}
              </UpcomingAppts>
            )}
          </Appointments>
        ) : (
          <Logs>
            {formStatus === "idle" && (
              <>
                <LogDiv>
                  {" "}
                  <p>Tuesday, August 28th, 2020</p>
                  <p>feeling: {form.feeling}</p>
                  <p>sleep: {form.sleep} hours</p>
                  {/* <p>physical activity: none</p> */}
                </LogDiv>
              </>
            )}
          </Logs>
        )}
      </Body>
      {/* </>
          )}
        </>
      ) : (
        <SignIn />
      )} */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100px;
  width: 100%;
`;

const PatientName = styled.h1`
  color: #0c4a60;
`;

const Title = styled.h1`
  &:hover {
    cursor: pointer;
    color: lightblue;
  }
`;

const Body = styled.div`
  display: flex;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const StyledP = styled.p`
  margin-bottom: 15px;
`;

const MedDiv = styled.div`
  margin: 40px 0px;
  display: flex;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Button = styled.button`
  margin-top: 20px;
  border: none;
  width: 200px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const Appointments = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  /* background: #86bbd8;
  color: white; */
`;

const UpcomingAppts = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Logs = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const LogDiv = styled.div`
  margin-bottom: 30px;
`;
export default Patient;
