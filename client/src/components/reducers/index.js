import { combineReducers } from "redux";

import doctor from "./doctor.reducer";
import doctors from "./doctors.reducer";
import currentUser from "./currentUser";
import patients from "./patients.reducer";
import patient from "./patient.reducer";
import forms from "./forms.reducer";
import appointments from "./appointments.reducer";

export default combineReducers({
  doctor,
  doctors,
  currentUser,
  patients,
  patient,
  forms,
  appointments,
});
