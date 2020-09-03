const initialState = {
  patient: null,
  status: "loading",
};

export default function patientReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_PATIENT": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_PATIENT": {
      return { ...state, patient: action.patient, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getPatient = (state) => {
  return state.item;
};
