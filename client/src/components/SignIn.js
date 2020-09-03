import React from "react";
import styled from "styled-components";
import { Redirect, Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  signIn,
  refreshPage,
  checkCurrentUser,
  setName,
  setRole,
} from "../actions";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const status = useSelector((state) => state.currentUser.status);

  let history = useHistory();

  const homepage = () => {
    history.push("/home");
  };

  const handleLogin = (ev) => {
    ev.preventDefault();
    const user = { email, password };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          dispatch(checkCurrentUser());
          dispatch(signIn(json.user._id));
          dispatch(setName(json.user.firstName));
          dispatch(setRole(json.user.role));
          homepage();
        } else {
          setError(json.message);
          console.log(json);
        }
      });
  };

  return (
    <Wrapper>
      <StyledContainer>
        <p>{error}</p>
        <Form onSubmit={(ev) => handleLogin(ev)}>
          <Label>email</Label>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label htmlFor="password">password</Label>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">login</Button>
        </Form>
      </StyledContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  /* background: #2f4858; */
`;

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid white;
  width: 900px;
  height: 700px;
  border-radius: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  justify-content: center;
`;

const Label = styled.label`
  margin-bottom: 15px;
  color: black;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid black;
  margin-bottom: 15px;
  height: 40px;
  background: white;
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.3);
  color: black;
  align-self: center;
  width: 200px;
  font-size: 20px;
  text-align: center;
  padding: 10px 5px;
  margin: 20px;
  border: none;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
  }
`;

export default SignIn;
