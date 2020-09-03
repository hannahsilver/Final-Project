import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDoctor } from "../reducers/doctor.reducer";
import { useParams } from "react-router-dom";

import { requestDoctor, receiveDoctor } from "../../actions";

const Doctor = () => {
  const params = useParams();
  const _id = params._id;
  const dispatch = useDispatch();

  const handleDoctor = (_id) => {
    dispatch(requestDoctor());
    fetch(`/doctors/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveDoctor(json));
      })
      .catch((err) => console.error(err));
  };
  const doctor = useSelector(getDoctor);
  React.useEffect(() => {
    handleDoctor(_id);
  }, [_id]);
  if (doctor.status === "loading") {
    return <>LOADING</>;
  } else {
    return <></>;
  }
};

export default Doctor;
