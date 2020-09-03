import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
// import { Icon } from "react-icons-kit";
// import { mail } from "react-icons-kit/entypo/mail";
// import { ic_notifications_none } from "react-icons-kit/md/ic_notifications_none";

import { useSelector } from "react-redux";

const Header = () => {
  const name = useSelector((state) => state.currentUser.name);
  const status = useSelector((state) => state.currentUser.status);

  return (
    <>
      {status && status === "loading" ? null : (
        <Wrapper>
          <div>
            <Greeting>Hello, {name}</Greeting>
          </div>
          <IconWrapper>
            {/* <Icon size={32} icon={mail} />
            <Icon size={32} icon={ic_notifications_none} /> */}
          </IconWrapper>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 125px;
  background: white;
  color: #ecd083;
  border-bottom: 5px solid #ef6c33;
`;

const Greeting = styled.h1`
  font-size: 75px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

export default Header;
