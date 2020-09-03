import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Redirect, Link } from "react-router-dom";
import { getDoctor } from "../reducers/doctor.reducer";

import { useSelector, useDispatch } from "react-redux";

const SignUpPatient = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signUp, setSignUp] = React.useState(false);

  const doctor = useSelector((state) => state.doctor.doctor);

  const allFieldsCompleted =
    firstName.length > 0 &&
    lastName.length > 0 &&
    email.length > 0 &&
    password.length > 0;

  let sendButtonStyle = {};

  if (allFieldsCompleted === false) {
    sendButtonStyle = {
      cursor: "auto",
      color: "lightgrey",
      backgroundColor: "grey",
    };
  }

  let history = useHistory();

  const signIn = () => {
    history.push("/sign-in");
  };

  const handlePatient = (firstName, lastName, email, password) => {
    fetch(`/patients`, {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        doctor: doctor,
      }),

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          console.log("good");
        } else {
          alert("Something went wrong.");
        }
      })
      .then((data) => console.log(data));
  };

  return (
    <Wrapper>
      {!signUp ? (
        <>
          <h1></h1>
          <FormWrapper>
            <NameWrapper>
              <NameInput>
                <InputWrapper>
                  <Label>First Name* </Label>
                  <Input
                    name="firstName"
                    type="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required="required"
                  />
                </InputWrapper>
              </NameInput>
              <NameInput>
                <InputWrapper>
                  <Label>Last Name*</Label>
                  <Input
                    name="lastName"
                    type="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required="required"
                  />
                </InputWrapper>
              </NameInput>
            </NameWrapper>
            <InputWrapper>
              <Label>Email* </Label>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required="required"
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Password*</Label>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required="required"
              />
            </InputWrapper>
            <SignUpButton
              disabled={allFieldsCompleted ? false : true}
              style={sendButtonStyle}
              onClick={(ev) => {
                handlePatient(firstName, lastName, email, password, doctor);
                setSignUp(true);
                signIn();
              }}
            >
              Sign Up
            </SignUpButton>
          </FormWrapper>
        </>
      ) : (
        <ConfirmationWrapper></ConfirmationWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: black;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  height: 500px;
  width: 800px;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NameInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 15px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  height: 30px;
`;

const SignUpButton = styled.button`
  width: 200px;
  padding: 10px 0px;
  align-self: center;
  margin-top: 23px;
  margin-bottom: 20px;
  border: none;
  background: black;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const ConfirmationWrapper = styled.div``;

export default SignUpPatient;
