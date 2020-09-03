import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [doctors, setDoctors] = useState();

  const getUser = (id) => {
    console.log(id, "id");
    fetch(`/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          const { _id, firstName, email, doctors } = json.user;
          setFirstName(firstName);
          setId(_id);
          setEmail(email);
          setStatus("idle");
          setDoctors(doctors);
        } else {
          console.log(json);
        }
      });
  };

  const logOut = () => {
    setStatus("loading");
    setFirstName();
    setEmail();
  };

  return (
    <UserContext.Provider
      value={{ status, firstName, email, getUser, logOut, doctors }}
    >
      {children}
    </UserContext.Provider>
  );
};
