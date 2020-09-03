const initialState = {
  appointments: [null],
  status: "loading",
};

export default function appointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_APPOINTMENTS": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_APPOINTMENTS": {
      return { ...state, appointments: action.appointments, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getAppointments = (state) => {
  return state.item;
};
