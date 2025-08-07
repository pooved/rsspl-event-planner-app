import type { Dispatch } from "preact/hooks";

export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
}

export interface InitialStateType {
  events: IEvent[];
  loading: boolean;
  error: string | null;
}

export type Action =
  | { type: "FETCH_ITEMS_REQUEST" }
  | { type: "FETCH_ITEMS_SUCCESS"; payload: IEvent[] }
  | { type: "FETCH_ITEMS_FAILURE"; payload: string }
  | { type: "ADD_EVENT"; payload: IEvent }
  | { type: "DELETE_EVENT"; payload: string }
  | { type: "UPDATE_EVENT"; payload: IEvent };

export const InitialState: InitialStateType = {
  events: [],
  loading: false,
  error: null,
};

export interface EventContextProps {
  state: InitialStateType;
  dispatch: Dispatch<Action>;
  addEvent: (event: Omit<IEvent, "id">) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (event: IEvent) => void;
}
