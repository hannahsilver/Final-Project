import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

const Doctors = (doctor) => {
  const user = useSelector((state) => state.currentUser.currentUser);
  const status = useSelector((state) => state.currentUser.status);

  return (
    <Wrapper>
      <Name>
        {doctor.doctor.firstName} {doctor.doctor.lastName}
      </Name>
      <p>email: {doctor.doctor.email}</p>
      {doctor.doctor.phone && <p>phone: {doctor.doctor.phone}</p>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 25px;
`;

const Name = styled.p`
  font-style: italic;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

export default Doctors;
