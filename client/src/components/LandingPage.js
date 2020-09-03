import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <StyledPageWrapper>
      <StyledContainer>
        <StyledHeader>
          <Title>welcome</Title>
        </StyledHeader>
        <StyledLink to="/sign-in">sign in</StyledLink>
        <StyledLink to="/sign-up">sign up</StyledLink>
      </StyledContainer>
    </StyledPageWrapper>
  );
};

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2f4858;
  /* background: #1c8776; */

  color: white;
  width: 100%;
  height: 100vh;
`;

const StyledHeader = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 900px;
  margin: 0px 0px 50px 0px;
  background: rgba(255, 255, 255, 0.3);
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

const StyledLink = styled(Link)`
  width: 200px;
  font-size: 30px;
  text-align: center;
  padding: 15px 20px;
  margin: 20px;
  border: solid 2px white;
  border-radius: 20px;
  background: #2f4858;
  /* background: #1c8776; */
  color: white;
  text-decoration: none;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border: none;
    padding: 17px 22px;
    cursor: pointer;
  }
`;

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid white;
  width: 900px;
  height: 700px;
  border-radius: 30px;
`;

const Title = styled.h1`
  color: white;
  font-size: 80px;
  font-weight: bold;
  font-style: italic;
`;

export default LandingPage;
