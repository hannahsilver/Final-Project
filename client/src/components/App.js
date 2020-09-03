import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp/SignUp";
import LandingPage from "./LandingPage";
import GlobalStyles from "./GlobalStyles";
import SignUpPatient from "./SignUp/SignUpPatient";
import SignUpDoctor from "./SignUp/SignUpDoctor";
import DoctorAuthentication from "./AuthenticationDoctor";
import PatientAuthentication from "./AuthenticationPatient";
import Patients from "./Doctor/Patients";
import Patient from "./Doctor/Patient";
import Doctor from "./Patient/Doctor";
import Doctors from "./Patient/Doctors";
import Form from "./Form";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route exact path="/authentication-doctor">
            <DoctorAuthentication />
          </Route>
          <Route exact path="/authentication-patient">
            <PatientAuthentication />
          </Route>
          <Route exact path="/sign-up-doctor">
            <SignUpDoctor />
          </Route>
          <Route exact path="/sign-up-patient">
            <SignUpPatient />
          </Route>
          <Route exact path="/home">
            <Header />
            <HomePage />
          </Route>
          <Route exact path="/patients">
            <Patients />
          </Route>
          <Route exact path="/patient/:_id">
            <Header />
            <Patient />
          </Route>
          <Route exact path="/doctor/:_id">
            <Doctor />
          </Route>
          <Route exact path="/doctors">
            <Doctors />
          </Route>
          <Route exact path="/form">
            <Form />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
