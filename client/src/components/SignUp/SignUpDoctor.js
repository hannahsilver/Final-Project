import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

// import { UserContext } from "../context/UserContext";

const SignUpDoctor = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [practice, setPractice] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signUp, setSignUp] = React.useState(false);

  // const { getUser } = React.useContext(UserContext);

  const allFieldsCompleted =
    firstName.length > 0 &&
    lastName.length > 0 &&
    email.length > 0 &&
    practice.length > 0 &&
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

  const handleDoctor = (
    firstName,
    lastName,
    email,
    practice,
    password,
    phone
  ) => {
    fetch(`/doctors`, {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        practice: practice,
        password: password,
        phone: phone,
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
      });
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
            </InputWrapper>{" "}
            <InputWrapper>
              <Label>Phone</Label>
              <Input
                name="phone"
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Practice*</Label>
              <Input
                name="practice"
                type="practice"
                value={practice}
                onChange={(e) => setPractice(e.target.value)}
                required="required"
              />
            </InputWrapper>
            <InputWrapper></InputWrapper>
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
                handleDoctor(firstName, lastName, email, practice, password);
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
  /* background: #ecd083; */
  color: black;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  /* background: #f5e6bd; */
  height: 80vh;
  width: 70vh;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 20px;
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

export default SignUpDoctor;
