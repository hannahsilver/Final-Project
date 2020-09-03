const initialState = {
  forms: null,
  status: "loading",
};

export default function formsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_FORMS": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_FORMS": {
      return { ...state, forms: action.forms, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getForms = (state) => {
  return state.forms;
};
