const initialState = {
  doctor: null,
  status: "loading",
};

export default function doctorReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_DOCTOR": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_DOCTOR": {
      return { ...state, doctor: action.doctor, status: "idle" };
    }
    case "SET_DOCTOR": {
      return { ...state, doctor: action.doctor, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getDoctor = (state) => {
  return state.item;
};
