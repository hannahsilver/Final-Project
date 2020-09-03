import React, { createContext, useState } from "react";

export const SignUpContext = createContext(null);

export const SignUpProvider = ({ children }) => {
  const [doctor, setDoctor] = useState();

  const getDoctor = (id, doctor) => {
    fetch(`/doctors`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: doctor, patient: id }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <SignUpContext.Provider value={{ doctor, setDoctor, getDoctor }}>
      {children}
    </SignUpContext.Provider>
  );
};
