import { actions } from "./actions";

const INITIAL_STATE = {
  email: "",
  year: "",
  month: "",
  bidones: [],
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.setEmail:
      return {
        ...state,
        email: action.payload,
      };
    case actions.setYear:
      return {
        ...state,
        year: action.payload,
      };
    case actions.setMonth:
      return {
        ...state,
        month: action.payload,
      };

    case actions.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case actions.setBidones:
      return {
        ...state,
        bidones: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
