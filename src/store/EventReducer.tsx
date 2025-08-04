import type { Action, InitialStateType } from "../types/event";

const EventReducer = (
  state: InitialStateType,
  action: Action
): InitialStateType => {
  switch (action.type) {
    case "ADD_EVENT":
      return {
        ...state,
        events: action.payload.events,
      };

    default:
      return state;
  }
};

export default EventReducer;
