import { createContext } from "preact";
import {
  InitialState,
  type EventContextProps,
  type IEvent,
} from "../types/event";
import { useEffect, useReducer, type ReactNode } from "preact/compat";
import EventReducer from "./EventReducer";

export const EventContext = createContext<EventContextProps | undefined>(
  undefined
);

export const EventContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(EventReducer, InitialState);

  async function addEvent(eventData: Omit<IEvent, "id">) {
    const response = await fetch("http://localhost:8000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    const addedEvent = await response.json();
    dispatch({ type: "ADD_EVENT", payload: addedEvent });
  }

  async function deleteEvent(id: string) {
    await fetch(`http://localhost:8000/events/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: "DELETE_EVENT",
      payload: id,
    });
  }
  async function updateEvent(event: IEvent) {
    const response = await fetch(`http://localhost:8000/events/${event.id}`, {
      method: "PUT", // or 'PATCH'
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    const updatedProduct = await response.json();
    dispatch({ type: "UPDATE_EVENT", payload: updatedProduct });
  }

  useEffect(() => {
    const fetchItems = async () => {
      dispatch({ type: "FETCH_ITEMS_REQUEST" });
      try {
        const response = await fetch("http://localhost:8000/events");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data: IEvent[] = await response.json();
        dispatch({ type: "FETCH_ITEMS_SUCCESS", payload: data });
      } catch (error: any) {
        dispatch({ type: "FETCH_ITEMS_FAILURE", payload: error.message });
      }
    };
    fetchItems();
  }, []);

  const value: EventContextProps = {
    state,
    dispatch,
    addEvent,
    deleteEvent,
    updateEvent,
  };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
