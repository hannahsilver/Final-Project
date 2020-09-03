import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { arrow_right } from "react-icons-kit/ikons/arrow_right";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setDoctor } from "../actions";

const PatientAuthentication = () => {
  const [authentication, setAuthentication] = React.useState("");
  const [error, setError] = React.useState("");

  const dispatch = useDispatch();

  const status = useSelector((state) => state.doctor.status);

  const handleDoctor = (ev) => {
    ev.preventDefault();
    const _id = { authentication };

    fetch(`/doctor`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_id),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          dispatch(setDoctor(json.data._id));
          console.log(json);
        } else {
          console.log(json);
          setError("sorry, that key is either incorrect or does not exist");
        }
      });
  };

  return (
    <Wrapper>
      {status === "idle" ? (
        <Redirect to="sign-up-patient" />
      ) : (
        <Form onSubmit={(ev) => handleDoctor(ev)}>
          <p>please enter your authentication key to begin registration</p>
          <Label></Label>
          <InputWrapper>
            <Input
              name="authentication"
              type="authentication"
              value={authentication}
              onChange={(e) => setAuthentication(e.target.value)}
            ></Input>
            <Button type="submit">
              <Icon icon={arrow_right} />
            </Button>
          </InputWrapper>
          <Error>{error}</Error>
        </Form>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label``;

const InputWrapper = styled.div``;

const Input = styled.input`
  margin-top: 30px;
`;

const Button = styled.button`
  background: white;
  border: none;
`;

const Error = styled.p`
  margin-top: 20px;
  color: red;
  font-style: italic;
`;

export default PatientAuthentication;
