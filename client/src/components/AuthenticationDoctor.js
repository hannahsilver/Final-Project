import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { arrow_right } from "react-icons-kit/ikons/arrow_right";

const DoctorAuthentication = () => {
  const [authentication, setAuthentication] = React.useState("");

  //need to do a fetch here

  return (
    <Wrapper>
      <FormWrapper>
        <p>please enter your authentication key to begin registration</p>
        <Label></Label>
        <InputWrapper>
          <Input
            name="authentication"
            type="authentication"
            value={authentication}
            onChange={(e) => setAuthentication(e.target.value)}
          ></Input>
          <Link to="/sign-up-doctor">
            <Icon icon={arrow_right} />
          </Link>
        </InputWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
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

export default DoctorAuthentication;
