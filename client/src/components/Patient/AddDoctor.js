import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/fa/plus";

import { useSelector, useDispatch } from "react-redux";

const AddDoctor = (doctor) => {
  const user = useSelector((state) => state.currentUser.currentUser);

  const [add, setAdd] = React.useState(false);
  const [key, setKey] = React.useState("");
  const [error, setError] = React.useState("");

  const handleAdd = (ev) => {
    ev.preventDefault();

    const doctor = { key };

    fetch(`${user}/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          console.log("good");
        } else {
          setError("invalid key");
          console.log(json);
        }
      });
  };
  return (
    <Wrapper>
      <AddIcon onClick={(ev) => setAdd(!add)} icon={plus} />
      {add ? (
        <Form onSubmit={handleAdd}>
          <Input
            type="text"
            name="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <label>insert provided key and press enter</label>
        </Form>
      ) : (
        <span> add practitioner</span>
      )}
      <p>{error}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
const AddIcon = styled(Icon)`
  margin-right: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input``;

export default AddDoctor;
