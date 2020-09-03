import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { arrow_right } from "react-icons-kit/ikons/arrow_right";

const SignUp = () => {
  return (
    <Wrapper>
      <StyledLink to="/authentication-doctor">
        <span style={{ marginRight: "20px" }}>Sign up as a practicioner</span>{" "}
        <Icon size={32} icon={arrow_right} />
      </StyledLink>

      <StyledLink to="/authentication-patient">
        <span style={{ marginRight: "20px" }}>Sign up as a patient</span>{" "}
        <Icon size={32} icon={arrow_right} />
      </StyledLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #86bbd8;
`;

const StyledLink = styled(Link)`
  color: #2f4858;

  padding: 0px 0px 60px 0px;
  margin: 0px 100px;
  border-bottom: 2px solid #2f4858;
  font-size: 40px;
  text-decoration: none;

  &:hover {
    color: white;
    border-bottom: 2px solid white;
  }
`;
export default SignUp;
