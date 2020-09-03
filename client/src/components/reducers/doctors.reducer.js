const initialState = {
  doctors: null,
  status: "loading",
};

export default function doctorsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_DOCTORS": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_DOCTORS": {
      return { ...state, doctors: action.doctors, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getDoctors = (state) => {
  return state.doctors;
};
