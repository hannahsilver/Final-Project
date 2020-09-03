const initialState = {
  status: "loading",
  currentUser: null,
  name: null,
  role: null,
};

export default function currentUserReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "LOADING_USER":
      return {
        ...state,
        status: "loading",
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        status: "idle",
        currentUser: action.user,
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.user,
      };
    case "SET_ROLE":
      return {
        ...state,
        role: action.user,
      };
    case "PAGE_REFRESH":
      if (action.user) {
        return { ...state, status: "idle", currentUser: action.user };
      } else {
        return { status: "idle", currentUser: null };
      }

    default: {
      return state;
    }
  }
}
