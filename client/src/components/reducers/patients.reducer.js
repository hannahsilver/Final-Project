const initialState = {
  patients: null,
  status: "loading",
};

export default function doctorsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_PATIENTS": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_PATIENTS": {
      return { ...state, patients: action.patients, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getPatients = (state) => {
  return state.doctors;
};
