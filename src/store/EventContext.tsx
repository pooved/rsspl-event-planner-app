import { createContext } from "preact";
import {
  InitialState,
  type EventContextProps,
  type IEvent,
} from "../types/event";
import { useReducer, type ReactNode } from "preact/compat";
import EventReducer from "./EventReducer";

export const EventContext = createContext<EventContextProps | undefined>(
  undefined
);

export const EventContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(EventReducer, InitialState);

  // Function to add data to json-server and update local state
  const addEvent = async (event: IEvent) => {
    const newEvent = [...state.events, event];
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      const addedEvent = await response.json();
      dispatch({ type: "ADD_EVENT", payload: addedEvent });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const value = {
    event: state.events,
    addEvent,
  };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
