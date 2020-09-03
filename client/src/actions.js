export const checkCurrentUser = () => ({
  type: "LOADING_USER",
});

export const signIn = (user) => ({
  type: "SET_CURRENT_USER",
  user,
});

export const refreshPage = (user) => ({
  type: "PAGE_REFRESH",
  user,
});

export const setName = (user) => ({
  type: "SET_NAME",
  user,
});

export const setRole = (user) => ({
  type: "SET_ROLE",
  user,
});

export const setDoctor = (doctor) => ({
  type: "SET_DOCTOR",
  doctor,
});

export const requestDoctor = () => ({
  type: "REQUEST_DOCTOR",
});

export const receiveDoctor = (doctor) => ({
  type: "RECEIVE_DOCTOR",
  doctor,
});

export const requestDoctors = () => ({
  type: "REQUEST_DOCTORS",
});
export const receiveDoctors = (doctors) => ({
  type: "RECEIVE_DOCTORS",
  doctors,
});

export const requestPatient = () => ({
  type: "REQUEST_PATIENTS",
});

export const receivePatient = (patient) => ({
  type: "RECEIVE_PATIENT",
  patient,
});

export const requestPatients = () => ({
  type: "REQUEST_PATIENTS",
});

export const receivePatients = (patients) => ({
  type: "RECEIVE_PATIENTS",
  patients,
});

export const updatePatientList = (patient) => ({
  type: "UPDATE_PATIENT_LIST",
  patient,
});

export const requestForms = () => ({
  type: "REQUEST_FORMS",
});

export const receiveForms = (forms) => ({
  type: "RECEIVE_FORMS",
  forms,
});

export const requestAppointments = () => ({
  type: "REQUEST_APPOINTMENTS",
});
export const receiveAppointments = (appointments) => ({
  type: "RECEIVE_APPOINTMENTS",
  appointments,
});
