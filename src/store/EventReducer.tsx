import {
  InitialState,
  type Action,
  type InitialStateType,
} from "../types/event";

const EventReducer = (
  state = InitialState,
  action: Action
): InitialStateType => {
  switch (action.type) {
    case "FETCH_ITEMS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ITEMS_SUCCESS":
      return {
        ...state,
        loading: false,
        events: action.payload.events,
        category: action.payload.category,
      };
    case "FETCH_ITEMS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    default:
      return state;
  }
};

export default EventReducer;
